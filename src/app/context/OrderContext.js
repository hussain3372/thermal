"use client";

import { createContext, useContext, useEffect, useState, Suspense } from "react";
import { getOrdersByStatus } from "@/api/handleStatus/getOrder"; // Ensure the import is correct
import { useSearchParams } from "next/navigation";

const OrderContext = createContext();

const OrderProviderContent = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "offer"; // Default status is "offer"

  useEffect(() => {
    // Reset orders and error on each status change
    setOrders([]);
    setError(null);
    
    // If no status is provided, don't fetch data
    if (!status) {
      setLoading(false);
      return;
    }
    
    const fetchOrders = async () => {
      setLoading(true); // Set loading state before fetching

      try {
        let response;
        // Fetch orders for both 'offer' and 'scheduled-job' if status is 'offer'
        if (status === "offer") {
          const offerResponse = await getOrdersByStatus("offer");
          const scheduledJobResponse = await getOrdersByStatus("scheduled-job");
          response = {
            data: [...offerResponse.data, ...scheduledJobResponse.data], // Merge both responses
          };
        } else {
          response = await getOrdersByStatus(status); // Fetch orders for the given status
        }

        console.log("API response", response);

        if (response?.data) {
          setOrders(response.data);
        } else {
          setOrders([]); // Ensure orders is always an array
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Order Not found for this status");
      } finally {
        setLoading(false); // Turn off loading once data is fetched
      }
    };

    fetchOrders();
  }, [status]); // Runs when status changes

  return (
    <OrderContext.Provider value={{ orders, loading, error }}>
      {children}
    </OrderContext.Provider>
  );
};

export const OrderProvider = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderProviderContent>{children}</OrderProviderContent>
    </Suspense>
  );
};

export const useOrders = () => useContext(OrderContext); // Hook to access the context
