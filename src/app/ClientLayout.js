"use client";
import "./globals.css";
import "./fonts.css";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Sidebar */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main content wrapper */}
      <div
        className={`flex transition-all duration-300 ease-in-out w-full`} // Make sure you provide a padding when sidebar is open (pl-64 or whatever works for your design)
      >
        {/* Sidebar (conditionally rendered based on isSidebarOpen state) */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main
          className={`flex-grow overflow-auto pr-3 sm:pr-6 pt-[111px] pb-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "pl-3 sm:pl-6" : "pl-3 sm:pl-6"
          } lg:pl-[247px]`} // Remove padding on large screens, apply padding on mobile based on sidebar state
        >
          {children}
        </main>
      </div>

      <ToastContainer />

    </div>
  );
}
