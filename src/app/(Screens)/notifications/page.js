import React from 'react'
import Notification from './Notification'
import ClientLayout from '@/app/ClientLayout'

const page = () => {
  return (
    <div>
      <ClientLayout>
        <Notification />
      </ClientLayout>
    </div>
  )
}

export default page