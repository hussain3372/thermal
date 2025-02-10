"use client";

import { dashboardCards } from "@/app/data/dashboard-cards.js";
import Image from "next/image";
import React from "react";
import Graph from "./Graph";
import RecentOrder from "./Recent-offers";
import RecentOffers from "./Recent-offers";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <div>
        <h1 className="main-heading">Dashboard</h1>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-6">
          <div className="grid sm:grid-cols-3 xl:col-span-6 gap-6 h-full">
            {dashboardCards && dashboardCards.length > 0 ? (
              dashboardCards.map((item, index) => (
                <div key={index} className="cards-bg">
                  <div className="flex flex-col items-start justify-start gap-4">
                    <h2 className="section-heading">{item.title}</h2>
                    <h1 className="font-20 font-bold leading-normal secondary-blue">
                      {item.price}
                    </h1>
                    <div className="flex items-center gap-1">
                      <Image
                        src={item.img}
                        width={16}
                        height={16}
                        alt="up-green"
                      />
                      <p className="font-12 green-color font-bold leading-4">
                        {item.percent}
                      </p>
                    </div>
                    {/* <p className="font-12 font-bold leading-4">{item.year}</p> */}
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p> // Display a fallback if dashboardCards is empty or undefined
            )}
          </div>

          <div className="xl:col-span-6">
            <Graph />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="font-20 leading-6">Recent Offers</h1>
          <div>
            <Link href="#" className="check-detail-btn">View All</Link>
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
