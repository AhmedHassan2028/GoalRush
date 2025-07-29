'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function AuthRedirect() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const previousAuthState = useRef<boolean | null>(null)

  useEffect(() => {
    if (!isLoaded) return // Wait for Clerk to load

    // Only redirect on auth state changes, not on every render
    if (previousAuthState.current === isSignedIn) return

    // Define protected routes that require authentication
    const protectedRoutes = ['/application']
    const isProtectedRoute = protectedRoutes.some(route =>
      pathname.startsWith(route)
    )

    if (previousAuthState.current !== null) {
      // This is an auth state change (not the initial load)
      if (isSignedIn && previousAuthState.current === false) {
        // User just signed in - redirect to dashboard
        console.log('User signed in, redirecting to dashboard from:', pathname)
        router.push('/application/dashboard')
      } else if (!isSignedIn && previousAuthState.current === true) {
        // User just signed out - redirect to home if on protected page
        if (isProtectedRoute) {
          console.log(
            'User signed out from protected page, redirecting to home from:',
            pathname
          )
          router.push('/')
        }
      }
    } else {
      // Initial load - only redirect if signed out user is on protected route
      if (!isSignedIn && isProtectedRoute) {
        console.log(
          'Signed out user on protected route, redirecting to home from:',
          pathname
        )
        router.push('/')
      }
    }

    // Update the previous auth state
    previousAuthState.current = isSignedIn
  }, [isLoaded, isSignedIn, pathname, router])

  // This component doesn't render anything
  return null
}
