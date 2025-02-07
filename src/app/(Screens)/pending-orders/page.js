import React from 'react'
import ClientLayout from "@/app/ClientLayout.js";
import Pending from './Pending';

const page = () => {
  return (
    <div>
        <ClientLayout>
            <Pending />
        </ClientLayout>
    </div>
  )
}

export default page