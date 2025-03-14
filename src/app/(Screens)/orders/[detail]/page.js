import React from "react";
import ClientLayout from "@/app/ClientLayout";
import OrderDetail from "./Order-detail";

const page = () => {
  return (
    <div>
      <ClientLayout>
        <OrderDetail />
      </ClientLayout>
    </div>
  );
};

export default page;
