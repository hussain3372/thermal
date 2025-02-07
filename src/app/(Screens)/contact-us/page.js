import React from "react";
import Contact from "./Contact";
import ClientLayout from "@/app/ClientLayout";

const page = () => {
  return (
    <div>
      <ClientLayout>
        <Contact />
      </ClientLayout>
    </div>
  );
};

export default page;
