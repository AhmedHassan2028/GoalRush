import { render, screen } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'
import Home from '../page'

// Mock Clerk's useUser hook
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
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

// Mock the ThemeSwitch component
jest.mock('@/components/theme-switch', () => {
  return function MockThemeSwitch() {
    return <div data-testid='theme-switch'>Theme Switch</div>
  }
})

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe('Home Page', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Loading State', () => {
    test('should render loading spinner when not loaded', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
        user: null,
      })

      render(<Home />)

      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass(
        'rounded-full',
        'h-32',
        'w-32',
        'border-b-2',
        'border-emerald-600'
      )
    })
  })

  describe('Navigation', () => {
    test('should render top navigation with logo and title', () => {
      render(<Home />)

      expect(screen.getByText('Next-Gen Platform')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    test('should render basic navigation links when not signed in', () => {
      render(<Home />)

      // Use getAllByRole to handle multiple Home links (desktop + mobile)
      const homeLinks = screen.getAllByRole('link', { name: /home/i })
      expect(homeLinks[0]).toHaveAttribute('href', '/')

      // Handle multiple App Info and Contact links
      const appInfoLinks = screen.getAllByRole('link', { name: /app info/i })
      expect(appInfoLinks[0]).toHaveAttribute('href', '/public/app-info')

      const contactLinks = screen.getAllByRole('link', { name: /contact/i })
      expect(contactLinks[0]).toHaveAttribute('href', '/public/contact-us')
    })

    test('should render additional navigation links when signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      render(<Home />)

      // Handle multiple Dashboard and Profile links
      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i })
      expect(dashboardLinks[0]).toHaveAttribute(
        'href',
        '/application/dashboard'
      )

      const profileLinks = screen.getAllByRole('link', { name: /profile/i })
      expect(profileLinks[0]).toHaveAttribute('href', '/application/user-page')
    })

    test('should render theme switch component', () => {
      render(<Home />)

      // Handle multiple theme switches (desktop + mobile)
      const themeSwitches = screen.getAllByTestId('theme-switch')
      expect(themeSwitches[0]).toBeInTheDocument()
    })
  })

  describe('Hero Section', () => {
    test('should render hero section with main title and description', () => {
      render(<Home />)

      expect(screen.getByText('Welcome to the Future')).toBeInTheDocument()
      expect(screen.getByText('Next-Gen')).toBeInTheDocument()
      expect(screen.getByText('Platform')).toBeInTheDocument()
      expect(
        screen.getByText(/Experience the perfect blend of modern technology/)
      ).toBeInTheDocument()
    })

    test('should render hero CTA buttons', () => {
      render(<Home />)

      const getStartedButton = screen.getByRole('link', {
        name: /get started/i,
      })
      expect(getStartedButton).toHaveAttribute('href', '/public/app-info')

      // Handle multiple "Learn More" links by getting all and checking the first hero one
      const learnMoreButtons = screen.getAllByRole('link', {
        name: /learn more/i,
      })
      expect(learnMoreButtons[0]).toHaveAttribute('href', '/public/contact-us')
    })
  })

  describe('Features Section', () => {
    test('should render features section with title', () => {
      render(<Home />)

      expect(screen.getByText('Why Choose Us?')).toBeInTheDocument()
      expect(
        screen.getByText(/Everything you need to build modern applications/)
      ).toBeInTheDocument()
    })

    test('should render all feature cards', () => {
      render(<Home />)

      expect(screen.getByText('Secure by Default')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Enterprise-grade security with authentication built-in'
        )
      ).toBeInTheDocument()

      expect(screen.getByText('Lightning Fast')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Optimized performance with Next.js 15 and modern tooling'
        )
      ).toBeInTheDocument()

      expect(screen.getByText('Team Ready')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Built for collaboration with role-based access control'
        )
      ).toBeInTheDocument()
    })
  })

  describe('Benefits Section', () => {
    test('should render benefits section with title', () => {
      render(<Home />)

      expect(screen.getByText('Built with Modern Tech')).toBeInTheDocument()
      expect(
        screen.getByText(/Our platform leverages the latest technologies/)
      ).toBeInTheDocument()
    })

    test('should render all benefits', () => {
      render(<Home />)

      const benefits = [
        'Modern React with Next.js 15',
        'Authentication with Clerk',
        'Beautiful UI with Tailwind CSS',
        'Type-safe with TypeScript',
        'Dark mode support',
        'Mobile responsive design',
      ]

      benefits.forEach(benefit => {
        expect(screen.getByText(benefit)).toBeInTheDocument()
      })
    })

    test('should render learn more link in benefits section', () => {
      render(<Home />)

      const learnMoreLink = screen.getByRole('link', {
        name: /learn more about our tech stack/i,
      })
      expect(learnMoreLink).toHaveAttribute('href', '/public/app-info')
    })
  })

  describe('CTA Section', () => {
    test('should render final CTA section', () => {
      render(<Home />)

      expect(screen.getByText('Ready to')).toBeInTheDocument()
      expect(screen.getByText('Get Started?')).toBeInTheDocument()
      expect(
        screen.getByText(/Join thousands of developers and teams/)
      ).toBeInTheDocument()
    })

    test('should render CTA buttons', () => {
      render(<Home />)

      const startJourneyButton = screen.getByRole('link', {
        name: /start your journey/i,
      })
      expect(startJourneyButton).toHaveAttribute('href', '/public/app-info')

      const contactSalesButton = screen.getByRole('link', {
        name: /contact sales/i,
      })
      expect(contactSalesButton).toHaveAttribute('href', '/public/contact-us')
    })
  })

  describe('Mobile Navigation', () => {
    test('should render mobile navigation for non-signed-in users', () => {
      render(<Home />)

      const mobileNav = document.querySelector('.md\\:hidden.fixed.bottom-0')
      expect(mobileNav).toBeInTheDocument()

      // Should have basic mobile nav links
      const mobileHomeLinks = screen.getAllByRole('link', { name: /home/i })
      const mobileHomeLink = mobileHomeLinks.find(link =>
        link.closest('.md\\:hidden.fixed.bottom-0')
      )
      expect(mobileHomeLink).toHaveAttribute('href', '/')
    })

    test('should render additional mobile navigation links when signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      })

      render(<Home />)

      // Should have dashboard and profile links in mobile nav
      const mobileDashboardLink = screen
        .getAllByRole('link', { name: /dashboard/i })
        .find(link => link.closest('.md\\:hidden.fixed.bottom-0'))
      expect(mobileDashboardLink).toHaveAttribute(
        'href',
        '/application/dashboard'
      )

      const mobileProfileLink = screen
        .getAllByRole('link', { name: /profile/i })
        .find(link => link.closest('.md\\:hidden.fixed.bottom-0'))
      expect(mobileProfileLink).toHaveAttribute(
        'href',
        '/application/user-page'
      )
    })
  })

  describe('Accessibility', () => {
    test('should have proper semantic structure', () => {
      render(<Home />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    test('should have proper heading structure', () => {
      render(<Home />)

      // Check for h1 elements
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements.length).toBeGreaterThan(0)

      // Check for h2 elements
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements.length).toBeGreaterThan(0)
    })

    test('should have accessible links', () => {
      render(<Home />)

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('Responsive Design', () => {
    test('should have responsive classes', () => {
      render(<Home />)

      const main = screen.getByRole('main')
      expect(main).toHaveClass(
        'max-w-7xl',
        'mx-auto',
        'px-4',
        'sm:px-6',
        'lg:px-8'
      )
    })

    test('should have mobile-hidden desktop navigation', () => {
      render(<Home />)

      const desktopNav = document.querySelector('.hidden.md\\:flex')
      expect(desktopNav).toBeInTheDocument()
    })

    test('should have desktop-hidden mobile navigation', () => {
      render(<Home />)

      const mobileNav = document.querySelector('.md\\:hidden.fixed.bottom-0')
      expect(mobileNav).toBeInTheDocument()
    })
  })

  describe('Styling and Layout', () => {
    test('should have proper gradient backgrounds', () => {
      render(<Home />)

      const mainContainer = document.querySelector(
        '.min-h-screen.bg-gradient-to-br'
      )
      expect(mainContainer).toHaveClass(
        'bg-gradient-to-br',
        'from-emerald-50',
        'via-teal-50',
        'to-cyan-50'
      )
    })

    test('should have animated background elements', () => {
      render(<Home />)

      const animatedElements = document.querySelectorAll('.animate-pulse')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    test('should have backdrop blur effects', () => {
      render(<Home />)

      const backdropElements = document.querySelectorAll(
        '[class*="backdrop-blur"]'
      )
      expect(backdropElements.length).toBeGreaterThan(0)
    })
  })
})
