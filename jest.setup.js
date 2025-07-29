import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_APP_NAME = 'Test App'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_mock_key'
process.env.CLERK_SECRET_KEY = 'sk_test_mock_key'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props) {
    // Remove Next.js-specific props that shouldn't be passed to img element
    const {
      priority,
      fill,
      sizes,
      quality,
      placeholder,
      blurDataURL,
      unoptimized,
      loader,
      onLoad,
      onError,
      onLoadingComplete,
      style,
      ...imgProps
    } = props

    // Handle fill prop by applying appropriate styling
    const finalStyle = fill
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: style?.objectFit || 'cover',
          ...style,
        }
      : style

    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} style={finalStyle} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

// Mock Next.js Navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    entries: jest.fn(),
    toString: jest.fn(),
  }),
  usePathname: () => '/',
  useParams: () => ({}),
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }) => (
    <div data-testid='clerk-provider'>{children}</div>
  ),
  SignedIn: ({ children }) => <div data-testid='signed-in'>{children}</div>,
  SignedOut: ({ children }) => <div data-testid='signed-out'>{children}</div>,
  SignInButton: ({ children, ...props }) => (
    <button data-testid='sign-in-button' {...props}>
      {children || 'Sign In'}
    </button>
  ),
  SignUpButton: ({ children, ...props }) => (
    <button data-testid='sign-up-button' {...props}>
      {children || 'Sign Up'}
    </button>
  ),
  UserButton: ({ showName, appearance, ...props }) => (
    <div
      data-testid='user-button'
      data-show-name={showName ? 'true' : 'false'}
      data-appearance={appearance ? JSON.stringify(appearance) : null}
      {...props}
    >
      User Menu
    </div>
  ),
  useUser: jest.fn(() => ({
    isSignedIn: false,
    user: null,
    isLoaded: true,
  })),
  useAuth: jest.fn(() => ({
    isSignedIn: false,
    isLoaded: true,
    signOut: jest.fn(),
  })),
}))

// Mock Clerk middleware
jest.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware: () => jest.fn(),
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ChartColumnBigIcon: ({ ...props }) => (
    <div data-testid='chart-icon' {...props} />
  ),
}))

// Mock loading spinner component
jest.mock('@/components/loading-spinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid='loading-spinner'>Loading...</div>
  }
})

// Mock error boundary component
jest.mock('@/components/error-boundary', () => {
  return function MockErrorBoundary({ children }) {
    return <div data-testid='error-boundary'>{children}</div>
  }
})

// Mock auth buttons component
jest.mock('@/components/auth-buttons', () => {
  return function MockAuthButtons() {
    return (
      <>
        <div data-testid='signed-out'>
          <div className='flex items-center'>
            <button data-testid='sign-in-button'>Sign In</button>
            <button data-testid='sign-up-button'>Sign Up</button>
          </div>
        </div>
        <div data-testid='signed-in'>
          <div data-testid='user-button'>User Menu</div>
        </div>
      </>
    )
  }
})

// Global test utilities
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
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock CSS files
jest.mock('@styles/globals.css', () => ({}))

// Setup for coverage improvements
beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks()
})
