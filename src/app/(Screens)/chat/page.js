'use client'

import Chat from "./Chat";
import ClientLayout from "@/app/ClientLayout";
import ChatSidebar from "./ChatSidebar";

const Page = () => {

  return (
    <div>
      <ClientLayout>
        <div>
          <ChatSidebar />
        </div>
      </ClientLayout>
    </div>
  );
};

export default Page;
