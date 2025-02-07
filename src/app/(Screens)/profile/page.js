import ClientLayout from "@/app/ClientLayout";
import React from "react";
import Profile from "./Profile";

const page = () => {
  return (
    <div className="bg-white">
      <ClientLayout className="bg-[#F5F9FF]">
        <Profile />
      </ClientLayout>
    </div>
  );
};

export default page;
