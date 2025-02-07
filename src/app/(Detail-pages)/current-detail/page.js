import React from "react";
import CurrentDetail from "./Current-detail";
import ClientLayout from "@/app/ClientLayout";

const page = () => {
  return (
    <div>
      <ClientLayout>
        <CurrentDetail />
      </ClientLayout>
    </div>
  );
};

export default page;
