import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

// Mock Clerk Provider for testing
function MockClerkProvider({ children }: { children: ReactNode }) {
  return <div data-testid='mock-clerk-provider'>{children}</div>
}

// Mock User Context
interface MockUserContextPropsI {
  isSignedIn?: boolean
  user?: {
    id: string
    firstName?: string
    lastName?: string
    emailAddress?: string
  } | null
  isLoaded?: boolean
  children: ReactNode
}

function MockUserProvider({
  isSignedIn = false,
  user = null,
  isLoaded = true,
  children,
}: MockUserContextPropsI) {
  return (
    <div
      data-testid='mock-user-provider'
      data-is-signed-in={isSignedIn}
      data-user={JSON.stringify(user)}
      data-is-loaded={isLoaded}
    >
      {children}
    </div>
  )
}

// Custom render function with providers
interface CustomRenderOptionsI extends Omit<RenderOptions, 'wrapper'> {
  clerkProps?: {
    isSignedIn?: boolean
    user?: {
      id: string
      firstName?: string
      lastName?: string
      emailAddress?: string
    } | null
    isLoaded?: boolean
  }
}

function customRender(ui: ReactElement, options: CustomRenderOptionsI = {}) {
  const { clerkProps = {}, ...renderOptions } = options

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MockClerkProvider>
        <MockUserProvider {...clerkProps}>{children}</MockUserProvider>
      </MockClerkProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Test data factories
export const testUsers = {
  authenticatedUser: {
    id: 'user_test123',
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@example.com',
  },
  unauthenticatedUser: null,
}

export const testEnvironmentVars = {
  NEXT_PUBLIC_APP_NAME: 'Test App',
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_mock_key',
  CLERK_SECRET_KEY: 'sk_test_mock_key',
}

// Mock implementations
export const mockClerkComponents = {
  ClerkProvider: MockClerkProvider,
  UserProvider: MockUserProvider,
  SignedIn: ({ children }: { children: ReactNode }) => (
    <div data-testid='mock-signed-in'>{children}</div>
  ),
  SignedOut: ({ children }: { children: ReactNode }) => (
    <div data-testid='mock-signed-out'>{children}</div>
  ),
  SignInButton: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: unknown
  }) => (
    <Button data-testid='mock-sign-in-button' {...props}>
      {children || 'Sign In'}
    </Button>
  ),
  SignUpButton: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: unknown
  }) => (
    <Button data-testid='mock-sign-up-button' {...props}>
      {children || 'Sign Up'}
    </Button>
  ),
  UserButton: ({
    showName = false,
    appearance,
    ...props
  }: {
    showName?: boolean
    appearance?: Record<string, unknown>
    [key: string]: unknown
  }) => (
    <div
      data-testid='mock-user-button'
      data-show-name={showName}
      data-appearance={JSON.stringify(appearance)}
      {...props}
    >
      User Menu
    </div>
  ),
}

// Mock hooks
export const mockClerkHooks = {
  useUser: (overrides: Record<string, unknown> = {}) => ({
    isSignedIn: false,
    user: null,
    isLoaded: true,
    ...overrides,
  }),
  useAuth: (overrides: Record<string, unknown> = {}) => ({
    isSignedIn: false,
    isLoaded: true,
    signOut: jest.fn(),
    ...overrides,
  }),
  useClerk: (overrides: Record<string, unknown> = {}) => ({
    openSignIn: jest.fn(),
    openSignUp: jest.fn(),
    ...overrides,
  }),
}

// Test assertion helpers
export const testHelpers = {
  expectElementToBeVisible: (element: Element) => {
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  },

  expectElementToHaveClasses: (element: Element, classes: string[]) => {
    classes.forEach(className => {
      expect(element).toHaveClass(className)
    })
  },

  expectLinkToHaveCorrectAttributes: (
    element: Element,
    href: string,
    isExternal: boolean = false
  ) => {
    expect(element).toHaveAttribute('href', href)
    if (isExternal) {
      expect(element).toHaveAttribute('target', '_blank')
      expect(element).toHaveAttribute('rel', 'noopener noreferrer')
    }
  },

  expectButtonToBeClickable: (element: Element) => {
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    expect(element).toBeEnabled()
  },
}

// Mock environment setup
export function setupTestEnvironment(envVars: Record<string, string> = {}) {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      ...testEnvironmentVars,
      ...envVars,
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  return originalEnv
}

// Mock timers helper
export function setupMockTimers() {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
}

// Window/DOM mocks
export function setupDOMMocks() {
  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    // Mock scrollTo
    window.scrollTo = jest.fn()

    // Mock fetch
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

// Error boundary test helper
export function createErrorBoundaryWrapper() {
  interface ErrorBoundaryPropsI {
    children: ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  }

  interface ErrorBoundaryStateI {
    hasError: boolean
  }

  class ErrorBoundary extends React.Component<
    ErrorBoundaryPropsI,
    ErrorBoundaryStateI
  > {
    constructor(props: ErrorBoundaryPropsI) {
      super(props)
      this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
      return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      if (this.props.onError) {
        this.props.onError(error, errorInfo)
      }
    }

    render() {
      if (this.state.hasError) {
        return <div data-testid='error-boundary'>Something went wrong.</div>
      }

      return this.props.children
    }
  }

  return ErrorBoundary
}

// Mock Next.js components
export const mockNextComponents = {
  Image: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    <img alt={alt} {...props} />
  ),
  Link: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode
    href: string
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}

// Mock router
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
}

// Mock searchParams
export const mockSearchParams = {
  get: jest.fn(),
  getAll: jest.fn(),
  has: jest.fn(),
  keys: jest.fn(),
  values: jest.fn(),
  entries: jest.fn(),
  toString: jest.fn(),
}

// Wait for async operations helper
export async function waitForAsyncOperation(timeout: number = 1000) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

// Mock console methods for testing
export function mockConsole() {
  const originalConsole = { ...console }

  beforeEach(() => {
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    console.info = jest.fn()
  })

  afterEach(() => {
    Object.assign(console, originalConsole)
  })

  return originalConsole
}

// Performance testing helper
export function measureRenderTime<T>(renderFn: () => T): [T, number] {
  const startTime = performance.now()
  const result = renderFn()
  const endTime = performance.now()
  return [result, endTime - startTime]
}

// Memory leak detection helper
export function detectMemoryLeaks() {
  const initialMemory = process.memoryUsage()

  return {
    checkForLeaks: () => {
      const currentMemory = process.memoryUsage()
      const heapDiff = currentMemory.heapUsed - initialMemory.heapUsed

      // Log memory difference (you can set thresholds as needed)
      if (heapDiff > 10 * 1024 * 1024) {
        // 10MB threshold
        console.warn(`Potential memory leak detected: ${heapDiff} bytes`)
      }

      return heapDiff
    },
  }
}

// Re-export everything from testing library
export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { customRender as render }
