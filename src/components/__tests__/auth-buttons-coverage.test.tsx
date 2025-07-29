import { render, screen } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'
import AuthButtons from '../auth-buttons'

// Mock only the Clerk hooks and components we need, not the actual AuthButtons component
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
  SignedIn: ({ children }: { children: React.ReactNode }) => children,
  SignedOut: ({ children }: { children: React.ReactNode }) => children,
  SignInButton: () => <button>Sign In</button>,
  SignUpButton: () => <button>Sign Up</button>,
}))

// Mock dependencies but not the main component
jest.mock('@/app/user-dropdown', () => {
  return function UserDropdown() {
    return <div>User Menu</div>
  }
})

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}))

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe('AuthButtons Coverage Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should execute loading state code path', () => {
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
      user: null,
    } as any)

    const { container } = render(<AuthButtons />)

    // Component should render something (loading spinner path)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('should execute signed out state code path', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    } as any)

    render(<AuthButtons />)

    // This should execute the signed out UI code path
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  test('should execute signed in state code path', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: { id: 'test-user' },
    } as any)

    render(<AuthButtons />)

    // This should execute the signed in UI code path
    expect(screen.getByText('User Menu')).toBeInTheDocument()
  })
})
