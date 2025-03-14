import React from 'react'
import ClientLayout from "@/app/ClientLayout.js";
import Orders from './Offer';


const page = () => {
  return (
    <div>
      <ClientLayout>
       <Orders />
      </ClientLayout>
    </div>
  )
}

export default page