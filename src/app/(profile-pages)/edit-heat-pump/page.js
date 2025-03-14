import ClientLayout from '@/app/ClientLayout'
import React from 'react'
import HeatPump from './HeatPump'

const page = () => {
  return (
    <div>
        <ClientLayout>
           <HeatPump/>
        </ClientLayout>
    </div>
  )
}

export default page