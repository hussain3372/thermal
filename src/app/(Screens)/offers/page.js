import React from 'react'
import Offer from './Offer'
import ClientLayout from "@/app/ClientLayout.js";


const page = () => {
  return (
    <div>
      <ClientLayout>
        <Offer/>
      </ClientLayout>
    </div>
  )
}

export default page