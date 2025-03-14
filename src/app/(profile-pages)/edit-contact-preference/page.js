import ClientLayout from '@/app/ClientLayout'
import React from 'react'
import ContactPreferences from './ContactPreference'

const page = () => {
  return (
    <div>
        <ClientLayout>
          <ContactPreferences/>
        </ClientLayout>
    </div>
  )
}

export default page