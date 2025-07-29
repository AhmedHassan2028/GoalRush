import { render, screen } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'
import UnprotectedLayout from '../layout'

// Mock Clerk's useUser hook
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, className, ...props }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
})

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Home: ({ className, ...props }: any) => (
    <div data-testid='home-icon' className={className} {...props} />
  ),
  Info: ({ className, ...props }: any) => (
    <div data-testid='info-icon' className={className} {...props} />
  ),
  MessageCircle: ({ className, ...props }: any) => (
    <div data-testid='message-circle-icon' className={className} {...props} />
  ),
  Globe: ({ className, ...props }: any) => (
    <div data-testid='globe-icon' className={className} {...props} />
  ),
  LayoutDashboard: ({ className, ...props }: any) => (
    <div data-testid='layout-dashboard-icon' className={className} {...props} />
  ),
  User: ({ className, ...props }: any) => (
    <div data-testid='user-icon' className={className} {...props} />
  ),
}))

// Mock ThemeSwitch component
jest.mock('@/components/theme-switch', () => {
  return function MockThemeSwitch() {
    return <div data-testid='theme-switch'>Theme Switch</div>
  }
})

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe('UnprotectedLayout', () => {
  const mockChildren = <div data-testid='test-children'>Test Content</div>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    test('should render without crashing', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      expect(screen.getByTestId('test-children')).toBeInTheDocument()
    })

    test('should render children content correctly', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      expect(screen.getByTestId('test-children')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })

  describe('Navigation Structure', () => {
    test('should render top navigation with logo and title', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
      expect(screen.getByText('Public Area')).toBeInTheDocument()
    })
  })

  describe('Public Navigation Links', () => {
    test('should render all public navigation links when signed out', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Public links should always be visible (both desktop and mobile)
      expect(screen.getAllByText('Home')).toHaveLength(2)
      expect(screen.getAllByText('App Info')).toHaveLength(2)
      expect(screen.getAllByText('Contact')).toHaveLength(2)

      // Check for correct icons (both desktop and mobile)
      expect(screen.getAllByTestId('home-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('info-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('message-circle-icon')).toHaveLength(2)
    })

    test('should render navigation links with correct href attributes', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Check for correct link hrefs (both desktop and mobile)
      const homeLinks = screen.getAllByRole('link', { name: /home/i })
      const appInfoLinks = screen.getAllByRole('link', { name: /app info/i })
      const contactLinks = screen.getAllByRole('link', { name: /contact/i })

      expect(homeLinks).toHaveLength(2)
      expect(appInfoLinks).toHaveLength(2)
      expect(contactLinks).toHaveLength(2)

      homeLinks.forEach(link => expect(link).toHaveAttribute('href', '/'))
      appInfoLinks.forEach(link =>
        expect(link).toHaveAttribute('href', '/public/app-info')
      )
      contactLinks.forEach(link =>
        expect(link).toHaveAttribute('href', '/public/contact-us')
      )
    })

    test('should apply hover and transition styles to navigation links', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Check for hover and transition classes (test desktop version)
      const homeLinks = screen.getAllByRole('link', { name: /home/i })
      const desktopHomeLink = homeLinks[0] // First one is desktop

      expect(desktopHomeLink).toHaveClass(
        'hover:text-foreground',
        'transition-all',
        'duration-200'
      )

      // Check for group hover effects
      expect(desktopHomeLink).toHaveClass('group')
    })
  })

  describe('Authenticated Navigation', () => {
    test('should not show dashboard and profile links when signed out', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Desktop navigation - Dashboard and Profile should not be present
      const dashboardLinks = screen.queryAllByText('Dashboard')
      const profileLinks = screen.queryAllByText('Profile')

      expect(dashboardLinks).toHaveLength(0)
      expect(profileLinks).toHaveLength(0)
    })

    test('should show dashboard and profile links when signed in', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        isLoaded: true,
        user: { id: '123' } as any,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Should show Dashboard and Profile in both desktop and mobile navigation
      const dashboardLinks = screen.getAllByText('Dashboard')
      const profileLinks = screen.getAllByText('Profile')

      expect(dashboardLinks).toHaveLength(2) // Desktop + Mobile
      expect(profileLinks).toHaveLength(2) // Desktop + Mobile

      // Check for correct icons
      expect(screen.getAllByTestId('layout-dashboard-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('user-icon')).toHaveLength(2)
    })

    test('should render authenticated links with correct href attributes', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        isLoaded: true,
        user: { id: '123' } as any,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Check for correct link hrefs (both desktop and mobile)
      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i })
      const profileLinks = screen.getAllByRole('link', { name: /profile/i })

      dashboardLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/application/dashboard')
      })

      profileLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/application/user-page')
      })
    })
  })

  describe('Theme Switch Integration', () => {
    test('should render theme switch in desktop and mobile navigation', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      const themeSwitches = screen.getAllByTestId('theme-switch')
      expect(themeSwitches).toHaveLength(2) // Desktop + Mobile
    })
  })

  describe('Mobile Navigation', () => {
    test('should render all public links in mobile navigation when signed out', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // All text should appear exactly twice (desktop + mobile)
      expect(screen.getAllByText('Home')).toHaveLength(2)
      expect(screen.getAllByText('App Info')).toHaveLength(2)
      expect(screen.getAllByText('Contact')).toHaveLength(2)
    })

    test('should include authenticated links in mobile nav when signed in', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        isLoaded: true,
        user: { id: '123' } as any,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Should have dashboard and profile links
      expect(screen.getAllByText('Dashboard')).toHaveLength(2)
      expect(screen.getAllByText('Profile')).toHaveLength(2)
    })
  })

  describe('Content Area', () => {
    test('should render content header with status indicators', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      expect(screen.getByText('Open Access')).toBeInTheDocument()
    })

    test('should render children within content area', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      expect(screen.getByTestId('test-children')).toBeInTheDocument()
    })
  })

  describe('Icon Integration', () => {
    test('should render all required icons when signed in', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        isLoaded: true,
        user: { id: '123' } as any,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Check that all icons are rendered
      expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('home-icon')).toHaveLength(2) // Desktop + Mobile
      expect(screen.getAllByTestId('info-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('message-circle-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('layout-dashboard-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('user-icon')).toHaveLength(2)
    })

    test('should render basic icons when signed out', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)

      // Check that basic icons are rendered
      expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('home-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('info-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('message-circle-icon')).toHaveLength(2)

      // Authenticated icons should not be present
      expect(
        screen.queryByTestId('layout-dashboard-icon')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('user-icon')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    test('should handle undefined user state gracefully', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: undefined as any,
        isLoaded: true,
        user: undefined,
      })

      expect(() =>
        render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)
      ).not.toThrow()

      // Should render without authenticated links
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })

    test('should handle null user state', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: null as any,
        isLoaded: true,
        user: null,
      })

      expect(() =>
        render(<UnprotectedLayout>{mockChildren}</UnprotectedLayout>)
      ).not.toThrow()
      expect(screen.getByTestId('test-children')).toBeInTheDocument()
    })

    test('should render with empty children', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      expect(() =>
        render(<UnprotectedLayout>{null}</UnprotectedLayout>)
      ).not.toThrow()
    })

    test('should render with complex children', () => {
      mockUseUser.mockReturnValue({
        isSignedIn: false,
        isLoaded: true,
        user: null,
      })

      const complexChildren = (
        <div>
          <h1>Complex Content</h1>
          <p>With multiple elements</p>
          <button>And interactive components</button>
        </div>
      )

      render(<UnprotectedLayout>{complexChildren}</UnprotectedLayout>)

      expect(screen.getByText('Complex Content')).toBeInTheDocument()
      expect(screen.getByText('With multiple elements')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /and interactive components/i })
      ).toBeInTheDocument()
    })
  })
})
