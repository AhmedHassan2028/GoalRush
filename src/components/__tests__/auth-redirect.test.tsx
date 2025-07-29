import { render } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import AuthRedirect from '../auth-redirect'

// Mock Clerk's useUser hook
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}))

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
}

// Mock console.log to verify redirect logging
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('AuthRedirect', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue(mockRouter)
    mockUsePathname.mockReturnValue('/')
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    })
  })

  afterEach(() => {
    consoleSpy.mockClear()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  describe('Rendering', () => {
    test('should render without crashing', () => {
      render(<AuthRedirect />)
      // Component should render successfully
    })

    test('should not render any visible content', () => {
      const { container } = render(<AuthRedirect />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Loading State', () => {
    test('should not redirect when Clerk is not loaded', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Initial Load Behavior', () => {
    test('should redirect unsigned user from protected route to home', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      render(<AuthRedirect />)

      expect(mockPush).toHaveBeenCalledWith('/')
      expect(consoleSpy).toHaveBeenCalledWith(
        'Signed out user on protected route, redirecting to home from:',
        '/application/dashboard'
      )
    })

    test('should not redirect signed in user from protected route', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should not redirect unsigned user from public route', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/public/app-info')

      render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should not redirect unsigned user from home route', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/')

      render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Authentication State Changes', () => {
    test('should redirect to dashboard when user signs in', () => {
      // First render with signed out user
      const { rerender } = render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()

      // User signs in
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      rerender(<AuthRedirect />)

      expect(mockPush).toHaveBeenCalledWith('/application/dashboard')
      expect(consoleSpy).toHaveBeenCalledWith(
        'User signed in, redirecting to dashboard from:',
        '/'
      )
    })

    test('should redirect to home when user signs out from protected route', () => {
      // Start with signed in user on protected route
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      const { rerender } = render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()

      // User signs out
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      expect(mockPush).toHaveBeenCalledWith('/')
      expect(consoleSpy).toHaveBeenCalledWith(
        'User signed out from protected page, redirecting to home from:',
        '/application/dashboard'
      )
    })

    test('should not redirect when user signs out from public route', () => {
      // Start with signed in user on public route
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })
      mockUsePathname.mockReturnValue('/public/app-info')

      const { rerender } = render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()

      // User signs out
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Protected Routes Detection', () => {
    test('should detect /application routes as protected', () => {
      const protectedPaths = [
        '/application',
        '/application/',
        '/application/dashboard',
        '/application/user-page',
        '/application/settings',
        '/application/nested/route',
      ]

      protectedPaths.forEach(path => {
        mockUsePathname.mockReturnValue(path)
        mockUseUser.mockReturnValue({
          isLoaded: true,
          isSignedIn: false,
          user: null,
        })

        const { unmount } = render(<AuthRedirect />)

        expect(mockPush).toHaveBeenCalledWith('/')
        mockPush.mockClear()
        unmount()
      })
    })

    test('should not detect public routes as protected', () => {
      const publicPaths = [
        '/',
        '/public',
        '/public/',
        '/public/app-info',
        '/public/contact-us',
        '/about',
        '/contact',
      ]

      publicPaths.forEach(path => {
        mockUsePathname.mockReturnValue(path)
        mockUseUser.mockReturnValue({
          isLoaded: true,
          isSignedIn: false,
          user: null,
        })

        const { unmount } = render(<AuthRedirect />)

        expect(mockPush).not.toHaveBeenCalled()
        unmount()
      })
    })
  })

  describe('Multiple Re-renders', () => {
    test('should not redirect multiple times on same auth state', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      const { rerender } = render(<AuthRedirect />)

      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith('/')

      // Re-render with same state
      rerender(<AuthRedirect />)

      // Should not redirect again
      expect(mockPush).toHaveBeenCalledTimes(1)
    })

    test('should return early when auth state has not changed', () => {
      // Initial render with signed in user
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      const { rerender } = render(<AuthRedirect />)

      // No redirect should happen on initial render for signed in user
      expect(mockPush).not.toHaveBeenCalled()

      // Re-render with same auth state (still signed in)
      // This should trigger the early return on line 17
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      rerender(<AuthRedirect />)

      // Still no redirect should happen
      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should return early when false auth state has not changed', () => {
      // Initial render with signed out user on public route
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/public/app-info')

      const { rerender } = render(<AuthRedirect />)

      // No redirect should happen on public route
      expect(mockPush).not.toHaveBeenCalled()

      // Re-render with same auth state (still signed out)
      // This should trigger the early return on line 17 with false === false
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      // Still no redirect should happen
      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should test specific early return condition on line 17', () => {
      // Start with loading state to ensure fresh initialization
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/')

      const { rerender } = render(<AuthRedirect />)

      // First transition to loaded with false
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      // Clear any calls from the initial state
      mockPush.mockClear()

      // Now trigger a useEffect with the same isSignedIn value
      // This should hit the early return condition: previousAuthState.current === isSignedIn
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false, // Same as before
        user: null,
      })

      rerender(<AuthRedirect />)

      // No redirect should occur due to early return
      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should cover all branch combinations for line 17 early return', () => {
      // Test case: previousAuthState.current is null and isSignedIn is true
      // This tests the specific branch that might be missing
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: true,
        user: { id: '123' } as any,
      })
      mockUsePathname.mockReturnValue('/')

      const { rerender } = render(<AuthRedirect />)

      // Transition to loaded state with isSignedIn true
      // On first load, previousAuthState.current will be null
      // So null === true should be false, continuing execution
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      rerender(<AuthRedirect />)

      // After this render, previousAuthState.current should be true
      // Now test true === true which should return early
      mockPush.mockClear()

      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true, // Same as before (true)
        user: { id: '123' } as any,
      })

      rerender(<AuthRedirect />)

      // Should return early and not call push
      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should cover null equals false branch combination', () => {
      // Test case: previousAuthState.current is null and isSignedIn is false
      // This should result in null === false which is false, so execution continues
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      const { rerender } = render(<AuthRedirect />)

      // Transition to loaded state with isSignedIn false on protected route
      // previousAuthState.current will be null
      // null === false should be false, so execution continues
      // Since this is initial load and user is signed out on protected route, should redirect
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      // Should redirect because it's initial load of signed out user on protected route
      expect(mockPush).toHaveBeenCalledWith('/')
    })

    test('should hit TRUE branch of line 17 condition by changing pathname', () => {
      // Force the TRUE branch by using pathname changes to trigger useEffect

      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })
      mockUsePathname.mockReturnValue('/')

      const { rerender } = render(<AuthRedirect />)

      // Clear any initial calls and change pathname to force useEffect to run again
      // but keep isSignedIn the same to trigger early return
      mockPush.mockClear()
      mockUsePathname.mockReturnValue('/different-path')

      rerender(<AuthRedirect />)

      // This should trigger the early return since previousAuthState.current should equal isSignedIn
      expect(mockPush).not.toHaveBeenCalled()
    })

    test('should handle multiple auth state changes correctly', () => {
      // Start signed out
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      const { rerender } = render(<AuthRedirect />)

      // Sign in
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      rerender(<AuthRedirect />)
      expect(mockPush).toHaveBeenCalledWith('/application/dashboard')

      // Sign out
      mockUsePathname.mockReturnValue('/application/dashboard')
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)
      expect(mockPush).toHaveBeenCalledWith('/')

      expect(mockPush).toHaveBeenCalledTimes(2)
    })
  })

  describe('Path Changes', () => {
    test('should respond to pathname changes while maintaining auth state', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/')

      render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()

      // Navigate to protected route while signed out
      // Since this is just a pathname change without auth state change,
      // and the component only redirects on auth state changes after initial load,
      // we need to clear the mocks and render fresh to simulate initial load
      jest.clearAllMocks()
      mockUsePathname.mockReturnValue('/application/dashboard')

      // Render fresh (simulates initial load on protected route)
      render(<AuthRedirect />)

      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  describe('Loading State Transitions', () => {
    test('should handle loading to loaded state transition', () => {
      // Start with loading state
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      const { rerender } = render(<AuthRedirect />)

      expect(mockPush).not.toHaveBeenCalled()

      // Transition to loaded state
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  describe('Edge Cases', () => {
    test('should handle undefined user state', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: undefined as any,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      expect(() => render(<AuthRedirect />)).not.toThrow()
      expect(mockPush).toHaveBeenCalledWith('/')
    })

    test('should handle router push errors gracefully', () => {
      mockPush.mockImplementation(() => {
        throw new Error('Router error')
      })

      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })
      mockUsePathname.mockReturnValue('/application/dashboard')

      // Component doesn't have error handling, so it will throw
      expect(() => render(<AuthRedirect />)).toThrow('Router error')

      // Reset the mock implementation for subsequent tests
      mockPush.mockReset()
      mockPush.mockImplementation(() => {})
    })
  })

  describe('Console Logging', () => {
    test('should log appropriate messages for different redirect scenarios', () => {
      // Test sign in redirect
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      const { rerender } = render(<AuthRedirect />)

      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      rerender(<AuthRedirect />)

      expect(consoleSpy).toHaveBeenCalledWith(
        'User signed in, redirecting to dashboard from:',
        '/'
      )

      // Test sign out redirect
      mockUsePathname.mockReturnValue('/application/dashboard')
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      })

      rerender(<AuthRedirect />)

      expect(consoleSpy).toHaveBeenCalledWith(
        'User signed out from protected page, redirecting to home from:',
        '/application/dashboard'
      )
    })
  })
})
