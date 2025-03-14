"use client";

import { useOrders } from "@/app/context/OrderContext";
import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Orders = () => {
  const { orders, loading, error } = useOrders();
  const searchParams = useSearchParams();

  // Check if 'status' is in the query params, if not default to 'offer'
  const status = searchParams.get("status") || "offer"; // Default status if not present

  // Filter orders based on status
  const actualOrders = orders || [];

  // Fix: Check if orders are loaded and apply the filter based on the status
  // In your Orders component, replace the filteredOrders line with:
  const filteredOrders = actualOrders.filter((order) =>
    status === "offer"
      ? ["offer", "scheduled-job"].includes(order.status)
      : order.status === status
  );

  if (loading) return <Loading />;

  if (error) return <div className="text-center">{error}</div>;

  if (!loading && filteredOrders.length === 0) {
    return (
      <div className="text-gray-500">🚫 No orders found for this status.</div>
    );
  }

  // Function to return the user-friendly status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "offer":
        return "Offer"; // More user-friendly status label
      case "scheduled-job":
        return "Scheduled Job"; // User-friendly label for scheduled jobs
      case "in-progress":
        return "In Progress"; // User-friendly label for in-progress status
      case "accept":
        return "Accepted"; // User-friendly label for accepted orders
      case "cancelled":
        return "Cancelled"; // User-friendly label for cancelled orders
      case "installation-completed":
        return "Installation Completed"; // User-friendly label for completed installations
      case "payment-in-progress":
        return "Payment In Progress"; // User-friendly label for payment status
      case "rejected":
        return "Rejected"; // User-friendly label for rejected orders
      case "Previous Orders":
        return "Previous Orders"; // User-friendly label for previous orders
      case "completed":
        return "Completed";
      case "reject":
        return "Reject"; // User-friendly label for rejected orders
      default:
        return "Unknown"; // Default label for unknown statuses
    }
  };

  // Function to return the class for the status for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "offer":
        return "new-badge"; // Yellow badge for Pending
      case "ongoing-job":
        return "scheduled-badge"; // Badge for Scheduled Jobs
      case "in-progress":
        return "pending-badge"; // Blue badge for 'In Progress'
      case "accept":
        return "accepted-badge"; // Green badge for Accepted
      case "cancelled":
        return "cancelled-badge"; // Red badge for Cancelled
      case "installation-completed":
        return "ongoing-badge"; // Orange badge for 'Installation Completed'
      case "payment-in-progress":
        return "completed-badge"; // Purple badge for 'Payment In Progress'
      case "rejected":
        return "cancelled-badge"; // Red badge for Rejected
      case "Previous Orders":
        return "completed-badge"; // Green badge for Previous Orders
      case "completed":
        return "completed-badge";
      case "reject":
        return "cancelled-badge"; // Red badge for Reject
      default:
        return "bg-[#668DFF] text-white"; // Default gray badge for unknown statuses
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-20 leading-6 flex items-center gap-3">
          {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
          {/* Capitalizing the first letter of status */}
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              name="text"
              className="global-input"
              placeholder="Find something.."
            />
            <div className="search-icon">
              <Image
                src="/search-icon.svg"
                width={16}
                height={16}
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="section-bg md:flex justify-between items-center"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <h1 className="font-16 font-bold leading-5 ">
                  {order.contractor_name || "Not specified"}
                </h1>
                <span className="font-12 font-normal leading-normal opacity-60">
                  {order.id || "Not specified"}
                </span>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/location.svg"
                  width={20}
                  height={20}
                  alt="location"
                />
                <span className="font-16 font-normal leading-normal opacity-35">
                  {order.location || "Not specified"}
                </span>
              </div>
              <div>
                <p className="font-12 font-normal leading-4 tracking-[0.15px] w-auto md:w-96 lg:w-auto">
                  {order.desc || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <Image
                  src="./calendar.svg"
                  width={20}
                  height={20}
                  alt="calendar"
                />
                <h1 className="font-16 font-normal leading-5 md:text-end">
                  {order.created_at || "Not specified"}
                </h1>
              </div>

              <div className="flex md:justify-end items-end">
                <h1 className={`new-badge ${getStatusClass(order.status)}`}>
                  {getStatusLabel(order.status)}{" "}
                  {/* Use user-friendly status label */}
                </h1>
              </div>

              <Link
                href={`/orders/${order.id}`}
                className="check-detail-btn flex md:justify-end items-end"
              >
                More...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
