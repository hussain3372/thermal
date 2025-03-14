"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import RecentOffers from "./Recent-offers";
import Link from "next/link";
import { getMatrix } from "@/api/dashboard/getMatrix";
import Loading from "@/app/loading";

const Dashboard = () => {
  const [matrix, setMatrix] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  // Fetch the details for the order
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true); // Ensure loading is true when fetching
        const data = await getMatrix(); // Make the API request
        console.log("Order Detail:", data); // Debugging: log the fetched data
        if (data) {
          setMatrix(data.data); // Set the details once fetched
        } else {
          setError("No details found for this order.");
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
        setError("An error occurred while fetching the order details.");
      } finally {
        setLoading(false); // Stop loading after the fetch
      }
    };

    fetchDetail();
  }, []); // Re-fetch when 'detail' changes

  if (loading) {
    return <Loading />; // Show loading screen while data is being fetched
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error if something went wrong
  }

  return (
    <div>
      <div>
        <h1 className="main-heading">Dashboard</h1>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-6">
          <div className="grid sm:grid-cols-3 xl:col-span-6 gap-6 h-full">
            <div className="cards-bg">
              <div className="flex flex-col items-start justify-start gap-4">
                <h2 className="section-heading">Total Earning</h2>
                <h1 className="font-20 font-bold leading-normal secondary-blue">
                  {matrix.earning}
                </h1>
                <div className="flex items-center gap-1">
                  <Image
                    src="/up-green.svg"
                    width={16}
                    height={16}
                    alt="up-green"
                  />
                  <p className="font-12 green-color font-bold leading-4">
                    {matrix.earning_percentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="cards-bg">
              <div className="flex flex-col items-start justify-start gap-4">
                <h2 className="section-heading">Completed jobs</h2>
                <h1 className="font-20 font-bold leading-normal secondary-blue">
                  {matrix.completed_jobs}
                </h1>
                <div className="flex items-center gap-1">
                  <Image
                    src="/up-green.svg"
                    width={16}
                    height={16}
                    alt="up-green"
                  />
                  <p className="font-12 green-color font-bold leading-4">
                    {matrix.completed_jobs_percentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="cards-bg">
              <div className="flex flex-col items-start justify-start gap-4">
                <h2 className="section-heading">Inprogress Jobs</h2>
                <h1 className="font-20 font-bold leading-normal secondary-blue">
                  {matrix.in_progress}
                </h1>
                <div className="flex items-center gap-1">
                  <Image
                    src="/up-green.svg"
                    width={16}
                    height={16}
                    alt="up-green"
                  />
                  <p className="font-12 green-color font-bold leading-4">
                    {matrix.in_progress_percentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="cards-bg">
              <div className="flex flex-col items-start justify-start gap-4">
                <h2 className="section-heading">Scheduled Jobs</h2>
                <h1 className="font-20 font-bold leading-normal secondary-blue">
                  {matrix.scheduled}
                </h1>
                <div className="flex items-center gap-1">
                  <Image
                    src="/up-green.svg"
                    width={16}
                    height={16}
                    alt="up-green"
                  />
                  <p className="font-12 green-color font-bold leading-4">
                    {matrix.scheduled_percentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="cards-bg">
              <div className="flex flex-col items-start justify-start gap-4">
                <h2 className="section-heading">Pending Jobs</h2>
                <h1 className="font-20 font-bold leading-normal secondary-blue">
                  {matrix.payment_in_progress}
                </h1>
                <div className="flex items-center gap-1">
                  <Image
                    src="/up-green.svg"
                    width={16}
                    height={16}
                    alt="up-green"
                  />
                  <p className="font-12 green-color font-bold leading-4">
                    {matrix.payment_in_progress_percentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="cards-bg">
              <div className="flex flex-col items-start justify-start gap-4">
                <h2 className="section-heading">Cancelled Orders</h2>
                <h1 className="font-20 font-bold leading-normal secondary-blue">
                  {matrix.cancelled}
                </h1>
                <div className="flex items-center gap-1">
                  <Image
                    src="/up-green.svg"
                    width={16}
                    height={16}
                    alt="up-green"
                  />
                  <p className="font-12 green-color font-bold leading-4">
                    {matrix.cancelled_percentage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-6">
            <Graph />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="font-20 leading-6">Recent Offers</h1>
          <div>
            <Link href="/orders?status=offer" className="check-detail-btn">
              View All
            </Link>
          </div>
        </div>

        <div>
          <RecentOffers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
