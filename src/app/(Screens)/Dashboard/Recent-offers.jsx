"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import { getOrdersByStatus } from "@/api/handleStatus/getOrder";

const RecentOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent offers
  useEffect(() => {
    const fetchOffers = async () => {
      const status = "offer";
      try {
        setLoading(true);
        const data = await getOrdersByStatus(status); // API request for recent offers
        if (data?.success) {
          setOffers(data.data); // Set fetched offers
        } else {
          setError("No offers available.");
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        setError("An error occurred while fetching offers.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <Loading />; // Show loading while fetching
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error message
  }

  if (!offers || offers.length === 0) {
    return <div className="text-center text-gray-500">No recent offers available</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {offers.slice(0, 2).map((order, index) => (
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
                <h1 className={`new-badge`}>
                  {order.status || "Unknown"}
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

export default RecentOffers;
