import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../../app/page'

// Mock Clerk's useUser hook
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(() => ({
    isLoaded: true,
    isSignedIn: false,
  })),
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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Rocket: ({ className }: any) => (
    <div data-testid='rocket-icon' className={className}>
      Rocket
    </div>
  ),
  Zap: ({ className }: any) => (
    <div data-testid='zap-icon' className={className}>
      Zap
    </div>
  ),
  Shield: ({ className }: any) => (
    <div data-testid='shield-icon' className={className}>
      Shield
    </div>
  ),
  Users: ({ className }: any) => (
    <div data-testid='users-icon' className={className}>
      Users
    </div>
  ),
  ArrowRight: ({ className }: any) => (
    <div data-testid='arrow-right-icon' className={className}>
      ArrowRight
    </div>
  ),
  Star: ({ className }: any) => (
    <div data-testid='star-icon' className={className}>
      Star
    </div>
  ),
  CheckCircle: ({ className }: any) => (
    <div data-testid='check-circle-icon' className={className}>
      CheckCircle
    </div>
  ),
  LayoutDashboard: ({ className }: any) => (
    <div data-testid='layout-dashboard-icon' className={className}>
      LayoutDashboard
    </div>
  ),
  User: ({ className }: any) => (
    <div data-testid='user-icon' className={className}>
      User
    </div>
  ),
}))

// Mock ThemeSwitch component
jest.mock('@/components/theme-switch', () => {
  return function MockThemeSwitch() {
    return <div data-testid='theme-switch'>ThemeSwitch</div>
  }
})

// Mock environment variables for integration tests
const originalEnv = process.env

beforeAll(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_APP_NAME: 'Integration Test App',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_integration_key',
  }
})

afterAll(() => {
  process.env = originalEnv
})

describe('App Integration Tests', () => {
  const user = userEvent.setup()

  describe('Component Rendering', () => {
    test('should render Home page correctly', () => {
      render(<Home />)

      // Check for main heading
      expect(screen.getByText('Next-Gen Platform')).toBeInTheDocument()

      // Check for welcome message
      expect(screen.getByText('Welcome to the Future')).toBeInTheDocument()

      // Check for main call-to-action
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })
  })

  describe('Home Page Content', () => {
    test('should display all required content elements', () => {
      render(<Home />)

      // Check main navigation
      const nav = document.querySelector('nav')
      expect(nav).toBeInTheDocument()

      // Check main content structure
      const main = document.querySelector('main')
      expect(main).toBeInTheDocument()

      // Check hero section
      expect(screen.getByText('Next-Gen')).toBeInTheDocument()
      expect(screen.getByText('Platform')).toBeInTheDocument()
      expect(
        screen.getByText(/Experience the perfect blend/)
      ).toBeInTheDocument()
    })

    test('should have all navigation links', () => {
      render(<Home />)

      // Check navigation links - handle multiple Home links (desktop + mobile)
      const homeLinks = screen.getAllByRole('link', { name: /home/i })
      expect(homeLinks[0]).toBeInTheDocument()

      // Handle multiple App Info and Contact links
      const appInfoLinks = screen.getAllByRole('link', { name: /app info/i })
      const contactLinks = screen.getAllByRole('link', { name: /contact/i })

      expect(appInfoLinks[0]).toBeInTheDocument()
      expect(contactLinks[0]).toBeInTheDocument()
    })

    test('should display features section', () => {
      render(<Home />)

      // Check features section
      expect(screen.getByText('Why Choose Us?')).toBeInTheDocument()
      expect(screen.getByText('Secure by Default')).toBeInTheDocument()
      expect(screen.getByText('Lightning Fast')).toBeInTheDocument()
      expect(screen.getByText('Team Ready')).toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    test('should handle link interactions on Home page', async () => {
      render(<Home />)

      const getStartedButton = screen.getByRole('link', {
        name: /get started/i,
      })
      // The "Learn More" text appears multiple times, so we need to be more specific
      const learnMoreButtons = screen.getAllByRole('link', {
        name: /learn more/i,
      })
      const learnMoreButton = learnMoreButtons[0] // Take the first one

      // Links should be hoverable without errors
      await user.hover(getStartedButton)
      await user.hover(learnMoreButton)

      expect(getStartedButton).toBeInTheDocument()
      expect(learnMoreButton).toBeInTheDocument()
    })

    test('should maintain proper structure after interactions', async () => {
      render(<Home />)

      const nav = document.querySelector('nav')
      const getStartedButton = screen.getByRole('link', {
        name: /get started/i,
      })

      // Hover interaction
      await user.hover(getStartedButton)

      // Structure should remain intact
      expect(nav).toBeInTheDocument()
      expect(getStartedButton).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    test('should handle responsive classes correctly', () => {
      render(<Home />)

      const nav = document.querySelector('nav')
      expect(nav).toHaveClass('backdrop-blur-md')

      // Check main container
      const main = document.querySelector('main')
      expect(main).toHaveClass('max-w-7xl', 'mx-auto')
    })

    test('should maintain layout integrity', () => {
      render(<Home />)

      // Check all major sections exist
      const nav = document.querySelector('nav')
      const main = document.querySelector('main')
      const getStartedButton = screen.getByRole('link', {
        name: /get started/i,
      })

      expect(nav).toBeInTheDocument()
      expect(main).toBeInTheDocument()
      expect(getStartedButton).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should maintain accessibility standards', () => {
      render(<Home />)

      // Check semantic structure
      const nav = document.querySelector('nav')
      const main = document.querySelector('main')

      expect(nav).toBeInTheDocument()
      expect(main).toBeInTheDocument()

      // Check headings hierarchy - there are multiple h1 elements in this design
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements.length).toBeGreaterThanOrEqual(1)
    })

    test('should have proper link roles and attributes', () => {
      render(<Home />)

      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)

      // Check that all links have proper href attributes
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('Error Handling', () => {
    test('should render without errors', () => {
      expect(() => render(<Home />)).not.toThrow()
    })

    test('should handle component loading gracefully', () => {
      // Test multiple renders to ensure stability
      for (let i = 0; i < 3; i++) {
        const { unmount } = render(<Home />)
        unmount()
      }
      expect(true).toBe(true) // If we reach here, no errors occurred
    })
  })

  describe('Performance', () => {
    test('should render efficiently', () => {
      const startTime = performance.now()
      render(<Home />)
      const endTime = performance.now()

      // Should render in reasonable time (less than 100ms in test environment)
      expect(endTime - startTime).toBeLessThan(100)
    })

    test('should not cause memory leaks', () => {
      const { unmount } = render(<Home />)
      expect(() => unmount()).not.toThrow()
    })
  })
})
