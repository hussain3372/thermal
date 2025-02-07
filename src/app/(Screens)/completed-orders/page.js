import React from 'react'
import ClientLayout from "@/app/ClientLayout.js";
import Completed from './Completed';


const page = () => {
  return (
    <div>
        <ClientLayout>
            <Completed />
        </ClientLayout>
    </div>
  )
}

export default page