import React from 'react'
import ClientLayout from "@/app/ClientLayout.js";
import Current from './Current';

const page = () => {
  return (
    <div>
        <ClientLayout>
            <Current />
        </ClientLayout>
    </div>
  )
}

export default page