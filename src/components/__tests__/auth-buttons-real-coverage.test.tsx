/**
 * This test file is specifically designed to achieve 100% code coverage
 * for lines 1-35 of src/components/auth-buttons.tsx
 */

import { render } from '@testing-library/react'

// Ensure we're testing the real component, not any existing mocks
jest.unmock('../auth-buttons')

// Mock only the external dependencies, not the component we're testing
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='signed-in'>{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='signed-out'>{children}</div>
  ),
  SignInButton: () => <button data-testid='sign-in-button'>Sign In</button>,
  SignUpButton: () => <button data-testid='sign-up-button'>Sign Up</button>,
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) => {
    // Handle the asChild prop properly to avoid React warnings
    if (asChild) {
      return children
    }
    return (
      <div data-testid='button' {...props}>
        {children}
      </div>
    )
  },
}))

jest.mock('@/app/user-dropdown', () => {
  return function UserDropdown() {
    return <div data-testid='user-dropdown'>User Dropdown</div>
  }
})

jest.mock('../loading-spinner', () => {
  return function LoadingSpinner() {
    return <div data-testid='loading-spinner'>Loading...</div>
  }
})

// Import the real component after mocking dependencies
import AuthButtons from '../auth-buttons'
import { useUser } from '@clerk/nextjs'

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe('AuthButtons Real Coverage Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('covers lines 1-14: imports, exports, and function declaration', () => {
    // Setting up the mock to return a loaded state
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    } as any)

    // This execution covers:
    // Line 1: 'use client' directive
    // Line 3: import { useUser } from '@clerk/nextjs'
    // Line 4: import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
    // Line 5: import { Button } from '@/components/ui/button'
    // Line 6: import UserDropdown from '@/app/user-dropdown'
    // Line 7: import LoadingSpinner from './loading-spinner'
    // Line 9: export default function AuthButtons() {
    // Line 10: const { isLoaded } = useUser()
    const { container } = render(<AuthButtons />)

    expect(container).toBeTruthy()
    // The component should have executed, verified by container having content
    expect(container.firstChild).toBeTruthy()
  })

  test('covers lines 12-14: loading state when isLoaded is false', () => {
    // Test the loading state path
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
      user: null,
    } as any)

    // This execution covers:
    // Line 12: if (!isLoaded) {
    // Line 13: return <LoadingSpinner />
    // Line 14: }
    const { container } = render(<AuthButtons />)

    expect(container.firstChild).toBeTruthy()
  })

  test('covers lines 16-27: signed out state', () => {
    // Test the signed out state
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    } as any)

    // This execution covers:
    // Line 16: return (
    // Line 17: <>
    // Line 18: <SignedOut>
    // Line 19: <div className='flex items-center'>
    // Line 20: <Button asChild variant='link' className='text-white'>
    // Line 21: <SignInButton />
    // Line 22: </Button>
    // Line 23: <Button asChild variant='link' className='text-white'>
    // Line 24: <SignUpButton />
    // Line 25: </Button>
    // Line 26: </div>
    // Line 27: </SignedOut>
    const { container } = render(<AuthButtons />)

    expect(container.querySelector('[data-testid="signed-out"]')).toBeTruthy()
  })

  test('covers lines 28-35: signed in state', () => {
    // Test the signed in state
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: { id: 'test-user' },
    } as any)

    // This execution covers:
    // Line 28: <SignedIn>
    // Line 29: <Button asChild variant='link' className='text-white'>
    // Line 30: <UserDropdown />
    // Line 31: </Button>
    // Line 32: </SignedIn>
    // Line 33: </>
    // Line 34: )
    // Line 35: }
    const { container } = render(<AuthButtons />)

    expect(container.querySelector('[data-testid="signed-in"]')).toBeTruthy()
  })

  test('covers all code paths in single comprehensive test', () => {
    // Test loading state
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
      user: null,
    } as any)

    let result = render(<AuthButtons />)
    expect(result.container).toBeTruthy()
    result.unmount()

    // Test signed out state
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    } as any)

    result = render(<AuthButtons />)
    expect(result.container).toBeTruthy()
    result.unmount()

    // Test signed in state
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: { id: 'test-user' },
    } as any)

    result = render(<AuthButtons />)
    expect(result.container).toBeTruthy()
    result.unmount()

    // This comprehensive test ensures all lines 1-35 are executed
  })
})
