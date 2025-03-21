"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GraphData } from "@/api/dashboard/graph"; // Import your API helper

// Dynamically import react-apexcharts to avoid server-side rendering issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Graph = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Yearly");
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: { show: false },
      height: 100,
      animations: { enabled: true },
    },
    legend: { show: false },
    xaxis: {
      categories: ["No Data"],
      labels: {
        show: true,
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
      tickAmount: 10,
    },
    yaxis: { 
      min: 0,
      tickAmount: 5,
    },
    stroke: { 
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
      colors: ["#0000FF"], // Change this color to match your theme
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    tooltip: { 
      x: { format: "dd MMM yyyy" },
      y: {
        formatter: function (value) {
          return value === 0 ? "No Orders" : value;
        }
      }
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: {
        left: 20,
        right: 20,
      },
    },
    noData: {
      text: "No Data Available",
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '16px',
      }
    },
  });
  const [chartSeries, setChartSeries] = useState([
    { name: "Revenue", data: [0] },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const filters = {
          Hourly: activeTab === "Hourly",
          Daily: activeTab === "Daily",
          Weekly: activeTab === "Weekly",
          Monthly: activeTab === "Monthly",
          Yearly: activeTab === "Yearly",
        };

        const response = await GraphData(filters);
        console.log("gaph response", response);
        if (response && response.success && response.data.length > 0) {
          const data = response.data;
          const categories = data.map((item) => item.interval);
          const seriesData = data.map((item) => Number(item.total) || 0);

          setChartOptions((prev) => ({
            ...prev,
            xaxis: {
              ...prev.xaxis,
              categories,
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontSize: "12px",
                },
              },
            },
          }));

          setChartSeries([{ 
            name: activeTab, 
            data: seriesData 
          }]);
        } else {
          // Handle no data case
          setChartOptions((prev) => ({
            ...prev,
            xaxis: {
              ...prev.xaxis,
              categories: ["No Data"],
              labels: {
                show: true,
                rotate: 0,
                style: {
                  fontSize: "12px",
                },
              },
            },
          }));
          setChartSeries([{ 
            name: activeTab, 
            data: [0] 
          }]);
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setChartOptions((prev) => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories: ["Error"],
            labels: {
              show: true,
              rotate: 0,
              style: {
                fontSize: "12px",
              },
            },
          },
        }));
        setChartSeries([{ name: activeTab, data: [0] }]);
      }
    };

    fetchGraphData();
  }, [activeTab]);

  if (!isMounted) return null;

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
