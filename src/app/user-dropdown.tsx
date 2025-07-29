'use client'

import { UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import LoadingSpinner from '@/components/loading-spinner'

export default function UserDropdown() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: '#374151',
          },
        },
        variables: {
          colorText: '#374151',
        },
      }}
    />
  )
}
