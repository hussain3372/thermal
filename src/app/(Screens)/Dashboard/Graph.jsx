'use client'

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-apexcharts to avoid server-side rendering issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Graph = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure this code only runs on the client
  }, []);

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false, // Remove the toolbar
      },
      height: 100,
    },
    legend: {
      show: false, // Remove the legend
    },
    xaxis: {
      categories: [
        "2/4",
        "3/4",
        "4/4",
        "5/4",
        "6/4",
        "7/4",
        "8/4",
        "9/4",
        "10/4",
      ],
    },
    yaxis: {
      min: 0,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const series = [
    {
      name: "series-1",
      data: [20, 24, 26, 18, 14, 6, 16, 20, 17],
      markers: {
        show: true, // Display markers by default
        size: 4, // Adjust the size of the markers
        colors: ["#008000"], // Set the color of the markers
        strokeColors: ["#008000"], // Set the stroke color of the markers
        strokeWidth: 2, // Set the stroke width of the markers
      },
    },
  ];

  if (!isMounted) {
    return null; // Prevent rendering on the server-side
  }

  return (
    <div className="section-bg h-full">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h1 className="section-heading text-start">Orders</h1>
        </div>
        <div>
          <ul className="flex items-center gap-1">
            <li className="text-[#00000066] font-10 font-normal leading-6 px-2 cursor-pointer rounded-sm hover:bg-white hover:text-black">
              Hourly
            </li>
            <li className="text-[#00000066] font-10 font-normal leading-6 px-2 cursor-pointer rounded-sm hover:bg-white hover:text-black">
              Daily
            </li>
            <li className="text-[#00000066] font-10 font-normal leading-6 px-2 cursor-pointer rounded-sm hover:bg-white hover:text-black">
              Weekly
            </li>
            <li className="text-[#00000066] font-10 font-normal leading-6 px-2 cursor-pointer rounded-sm hover:bg-white hover:text-black">
              Monthly
            </li>
            <li className="text-[#00000066] font-10 font-normal leading-6 px-2 cursor-pointer rounded-sm hover:bg-white hover:text-black">
              Yearly
            </li>
          </ul>
        </div>
      </div>

      <div>
        <Chart
          id="chart"
          options={options}
          series={series}
          height={300}
          type="line"
        />
      </div>
    </div>
  );
};

export default Graph;
