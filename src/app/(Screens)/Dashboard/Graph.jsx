'use client';

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GraphData } from "@/api/dashboard/graph"; // Import your API helper

// Dynamically import react-apexcharts to avoid server-side rendering issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Graph = () => {
  const [isMounted, setIsMounted] = useState(false);
  // State to track the active time period tab
  const [activeTab, setActiveTab] = useState("Hourly");

  // Chart options and series that will be updated from API response
  const [chartOptions, setChartOptions] = useState({
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
      categories: [], // Will be updated with API data
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
  });
  const [chartSeries, setChartSeries] = useState([]);

  // Ensure client-only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch graph data whenever the active tab changes
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        // Build the filters object based on the active tab.
        // Only the active time period is set to true.
        const filters = {
          Hourly: activeTab === "Hourly",
          Daily: activeTab === "Daily",
          Weekly: activeTab === "Weekly",
          Monthly: activeTab === "Monthly",
          Yearly: activeTab === "Yearly",
        };

        const response = await GraphData(filters);
        if (response && response.success) {
          const data = response.data;
          // Map API response to the required format for ApexCharts
          const categories = data.map((item) => item.interval);
          const seriesData = data.map((item) => item.total);

          setChartOptions((prev) => ({
            ...prev,
            xaxis: { categories },
          }));

          setChartSeries([
            {
              name: activeTab,
              data: seriesData,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, [activeTab]);

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
            {["Hourly", "Daily", "Weekly", "Monthly", "Yearly"].map(
              (period) => (
                <li
                  key={period}
                  onClick={() => setActiveTab(period)}
                  className={`text-[#00000066] font-10 font-normal leading-6 px-2 cursor-pointer rounded-sm hover:bg-white hover:text-black ${
                    activeTab === period ? "bg-white text-black" : ""
                  }`}
                >
                  {period}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div>
        <Chart
          id="chart"
          options={chartOptions}
          series={chartSeries}
          height={300}
          type="line"
        />
      </div>
    </div>
  );
};

export default Graph;
