import React from "react";
import Pending from "./Pending";
import ClientLayout from "@/app/ClientLayout";

const page = () => {
  return (
    <div>
      <ClientLayout>
        <Pending />
      </ClientLayout>
    </div>
  );
};

export default page;
