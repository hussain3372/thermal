import React from "react";
import OrderDetail from "./Order-detail";
import ClientLayout from "@/app/ClientLayout";

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
