'use client'

import { useUser } from '@clerk/nextjs'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import UserDropdown from '@/app/user-dropdown'
import LoadingSpinner from './loading-spinner'

export default function AuthButtons() {
  const { isLoaded } = useUser()

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  return (
    <>
      <SignedOut>
        <div className='flex items-center'>
          <Button
            asChild
            variant='link'
            className='text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200'
          >
            <SignInButton />
          </Button>
          <Button
            asChild
            variant='link'
            className='text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200'
          >
            <SignUpButton />
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <UserDropdown />
      </SignedIn>
    </>
  )
}
