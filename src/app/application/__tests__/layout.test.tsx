import { render, screen } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'
import AppLayout from '../layout'

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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Home: ({ className }: any) => (
    <div data-testid='home-icon' className={className}>
      Home Icon
    </div>
  ),
  LayoutDashboard: ({ className }: any) => (
    <div data-testid='dashboard-icon' className={className}>
      Dashboard Icon
    </div>
  ),
  User: ({ className }: any) => (
    <div data-testid='user-icon' className={className}>
      User Icon
    </div>
  ),
  Sparkles: ({ className }: any) => (
    <div data-testid='sparkles-icon' className={className}>
      Sparkles Icon
    </div>
  ),
  Info: ({ className }: any) => (
    <div data-testid='info-icon' className={className}>
      Info Icon
    </div>
  ),
  MessageCircle: ({ className }: any) => (
    <div data-testid='message-icon' className={className}>
      Message Icon
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

describe('AppLayout', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('should render layout with children', () => {
      render(
        <AppLayout>
          <div data-testid='test-content'>Test Content</div>
        </AppLayout>
      )

      expect(screen.getByTestId('test-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    test('should render main heading', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getByText('Protected Area')).toBeInTheDocument()
    })

    test('should render authenticated session indicator', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getByText('Authenticated Session')).toBeInTheDocument()
    })

    test('should render all icons', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getByTestId('sparkles-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('home-icon')[0]).toBeInTheDocument()
      expect(screen.getAllByTestId('info-icon')[0]).toBeInTheDocument()
      expect(screen.getAllByTestId('message-icon')[0]).toBeInTheDocument()
    })
  })

  describe('Navigation - Not Signed In', () => {
    test('should render basic navigation links when not signed in', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const homeLinks = screen.getAllByRole('link', { name: /home/i })
      const appInfoLinks = screen.getAllByRole('link', { name: /app info/i })
      const contactLinks = screen.getAllByRole('link', { name: /contact/i })

      expect(homeLinks[0]).toHaveAttribute('href', '/')
      expect(appInfoLinks[0]).toHaveAttribute('href', '/public/app-info')
      expect(contactLinks[0]).toHaveAttribute('href', '/public/contact-us')
    })

    test('should not render dashboard and profile links when not signed in', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(
        screen.queryByRole('link', { name: /dashboard/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('link', { name: /profile/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('Navigation - Signed In', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      } as any)
    })

    test('should render additional navigation links when signed in', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i })
      const profileLinks = screen.getAllByRole('link', { name: /profile/i })

      expect(dashboardLinks[0]).toHaveAttribute(
        'href',
        '/application/dashboard'
      )
      expect(profileLinks[0]).toHaveAttribute('href', '/application/user-page')
    })

    test('should render dashboard and user icons when signed in', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getAllByTestId('dashboard-icon')[0]).toBeInTheDocument()
      expect(screen.getAllByTestId('user-icon')[0]).toBeInTheDocument()
    })

    test('should render all basic links plus authenticated links', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      // Basic links
      expect(
        screen.getAllByRole('link', { name: /home/i })[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByRole('link', { name: /app info/i })[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByRole('link', { name: /contact/i })[0]
      ).toBeInTheDocument()

      // Authenticated links
      expect(
        screen.getAllByRole('link', { name: /dashboard/i })[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByRole('link', { name: /profile/i })[0]
      ).toBeInTheDocument()
    })
  })

  describe('Desktop Navigation', () => {
    test('should render desktop navigation with correct styling', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const desktopNav = document.querySelector('.hidden.md\\:flex')
      expect(desktopNav).toBeInTheDocument()
      expect(desktopNav).toHaveClass('items-center', 'space-x-1')
    })

    test('should render theme switch component in desktop nav', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const themeSwitch = screen.getAllByTestId('theme-switch')[0]
      expect(themeSwitch).toBeInTheDocument()
    })

    test('should render navigation links with proper styling', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const homeLink = screen.getAllByRole('link', { name: /home/i })[0]
      expect(homeLink).toHaveClass(
        'flex',
        'items-center',
        'px-3',
        'py-2',
        'rounded-lg'
      )
    })
  })

  describe('Mobile Navigation', () => {
    test('should render mobile navigation', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const mobileNav = document.querySelector('.md\\:hidden.fixed.bottom-0')
      expect(mobileNav).toBeInTheDocument()
      expect(mobileNav).toHaveClass('left-0', 'right-0', 'z-20')
    })

    test('should render mobile navigation links for non-signed-in users', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      // Mobile nav has multiple instances of same links
      const allHomeLinks = screen.getAllByRole('link', { name: /home/i })
      const allAppInfoLinks = screen.getAllByRole('link', { name: /app info/i })
      const allContactLinks = screen.getAllByRole('link', { name: /contact/i })

      expect(allHomeLinks.length).toBeGreaterThan(1) // Desktop + Mobile
      expect(allAppInfoLinks.length).toBeGreaterThan(1)
      expect(allContactLinks.length).toBeGreaterThan(1)
    })

    test('should render additional mobile navigation links when signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      } as any)

      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const allDashboardLinks = screen.getAllByRole('link', {
        name: /dashboard/i,
      })
      const allProfileLinks = screen.getAllByRole('link', { name: /profile/i })

      expect(allDashboardLinks.length).toBeGreaterThan(1) // Desktop + Mobile
      expect(allProfileLinks.length).toBeGreaterThan(1)
    })

    test('should render theme switch in mobile nav', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const allThemeSwitches = screen.getAllByTestId('theme-switch')
      expect(allThemeSwitches.length).toBe(2) // Desktop + Mobile
    })

    test('should have proper mobile navigation layout', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const mobileNavContent = document.querySelector(
        '.flex.items-center.justify-around.py-2'
      )
      expect(mobileNavContent).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    test('should have proper main container styling', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const mainContainer = document.querySelector(
        '.min-h-screen.bg-gradient-to-br'
      )
      expect(mainContainer).toHaveClass(
        'from-blue-50',
        'via-indigo-50',
        'to-purple-50'
      )
      expect(mainContainer).toHaveClass(
        'dark:from-slate-900',
        'dark:via-blue-900',
        'dark:to-purple-900'
      )
    })

    test('should render animated background elements', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const animatedElements = document.querySelectorAll('.animate-pulse')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    test('should render backdrop blur navigation', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('backdrop-blur-md', 'bg-white/80')
      expect(nav).toHaveClass(
        'dark:bg-slate-800/80',
        'dark:border-slate-700/50'
      )
    })

    test('should render main content area', () => {
      render(
        <AppLayout>
          <div data-testid='main-content'>Main Content</div>
        </AppLayout>
      )

      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveClass(
        'max-w-7xl',
        'mx-auto',
        'px-4',
        'sm:px-6',
        'lg:px-8'
      )
      expect(screen.getByTestId('main-content')).toBeInTheDocument()
    })

    test('should render content header with indicators', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getByText('Authenticated Session')).toBeInTheDocument()

      // Check for status indicator dot
      const statusDot = document.querySelector(
        '.w-2.h-2.bg-green-500.rounded-full.animate-pulse'
      )
      expect(statusDot).toBeInTheDocument()

      // Check for animated indicator dots
      const indicatorDots = document.querySelectorAll(
        '.w-1.h-1.rounded-full.animate-pulse'
      )
      expect(indicatorDots).toHaveLength(3)
    })

    test('should render content wrapper with proper styling', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const contentWrapper = document.querySelector(
        '.backdrop-blur-sm.bg-white\\/50'
      )
      expect(contentWrapper).toBeInTheDocument()
      expect(contentWrapper).toHaveClass('rounded-2xl', 'border', 'shadow-xl')
    })
  })

  describe('Accessibility', () => {
    test('should have proper semantic structure', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    test('should have proper heading structure', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Protected Area')
    })

    test('should have accessible links', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('Visual Elements', () => {
    test('should render gradient text for main heading', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const heading = screen.getByText('Protected Area')
      expect(heading).toHaveClass(
        'bg-gradient-to-r',
        'from-blue-600',
        'to-purple-600',
        'bg-clip-text',
        'text-transparent'
      )
      expect(heading).toHaveClass('dark:from-blue-400', 'dark:to-purple-400')
    })

    test('should render logo with gradient background', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const logoContainer = document.querySelector(
        '.bg-gradient-to-r.from-blue-500.to-purple-600'
      )
      expect(logoContainer).toBeInTheDocument()
      expect(logoContainer).toHaveClass('p-2', 'rounded-lg', 'shadow-lg')
    })

    test('should render all animated background circles', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      // First animated circle
      const circle1 = document.querySelector(
        '.-top-40.-right-40.w-80.h-80.bg-gradient-to-br.from-blue-400\\/20.to-purple-600\\/20'
      )
      expect(circle1).toBeInTheDocument()

      // Second animated circle
      const circle2 = document.querySelector(
        '.-bottom-40.-left-40.w-80.h-80.bg-gradient-to-tr.from-indigo-400\\/20.to-pink-600\\/20'
      )
      expect(circle2).toBeInTheDocument()

      // Third animated circle
      const circle3 = document.querySelector(
        '.top-1\\/2.left-1\\/2.w-96.h-96.bg-gradient-to-r.from-cyan-300\\/10.to-violet-300\\/10'
      )
      expect(circle3).toBeInTheDocument()
    })

    test('should render content header with gradient background', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const contentHeader = document.querySelector(
        '.bg-gradient-to-r.from-blue-500\\/10.to-purple-500\\/10'
      )
      expect(contentHeader).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    test('should have responsive navigation classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const desktopNav = document.querySelector('.hidden.md\\:flex')
      expect(desktopNav).toBeInTheDocument()

      const mobileNav = document.querySelector('.md\\:hidden.fixed.bottom-0')
      expect(mobileNav).toBeInTheDocument()
    })

    test('should have responsive container classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const container = document.querySelector(
        '.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8'
      )
      expect(container).toBeInTheDocument()
    })

    test('should have proper navigation container styling', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const navContainer = document.querySelector(
        '.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8'
      )
      expect(navContainer).toBeInTheDocument()

      const navFlex = document.querySelector(
        '.flex.justify-between.items-center.h-16'
      )
      expect(navFlex).toBeInTheDocument()
    })
  })

  describe('Dark Mode Support', () => {
    test('should have dark mode classes for main container', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const mainContainer = document.querySelector('.min-h-screen')
      expect(mainContainer).toHaveClass(
        'dark:from-slate-900',
        'dark:via-blue-900',
        'dark:to-purple-900'
      )
    })

    test('should have dark mode navigation classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass(
        'dark:bg-slate-800/80',
        'dark:border-slate-700/50'
      )
    })

    test('should have dark mode navigation link classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const homeLink = screen.getAllByRole('link', { name: /home/i })[0]
      expect(homeLink).toHaveClass('dark:hover:bg-slate-700/50')
    })

    test('should have dark mode content wrapper classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const contentWrapper = document.querySelector('.backdrop-blur-sm')
      expect(contentWrapper).toHaveClass(
        'dark:bg-slate-800/50',
        'dark:border-slate-700/50'
      )
    })

    test('should have dark mode content header classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const contentHeader = document.querySelector(
        '.bg-gradient-to-r.from-blue-500\\/10.to-purple-500\\/10'
      )
      expect(contentHeader).toHaveClass(
        'dark:from-blue-400/10',
        'dark:to-purple-400/10',
        'dark:border-slate-700/50'
      )
    })

    test('should have dark mode mobile navigation classes', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const mobileNav = document.querySelector('.md\\:hidden.fixed.bottom-0')
      expect(mobileNav).toHaveClass(
        'dark:bg-slate-800/90',
        'dark:border-slate-700/50'
      )
    })
  })

  describe('Authentication State Changes', () => {
    test('should conditionally render authenticated navigation', () => {
      // Test not signed in
      const { rerender } = render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(
        screen.queryByRole('link', { name: /dashboard/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('link', { name: /profile/i })
      ).not.toBeInTheDocument()

      // Test signed in
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: { id: '123' } as any,
      } as any)

      rerender(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(
        screen.getAllByRole('link', { name: /dashboard/i })[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByRole('link', { name: /profile/i })[0]
      ).toBeInTheDocument()
    })

    test('should always render authenticated session indicator regardless of sign-in state', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      expect(screen.getByText('Authenticated Session')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    test('should render children correctly within layout structure', () => {
      const testContent = (
        <div>
          <h2>Test Heading</h2>
          <p>Test paragraph content</p>
          <button>Test Button</button>
        </div>
      )

      render(<AppLayout>{testContent}</AppLayout>)

      expect(screen.getByText('Test Heading')).toBeInTheDocument()
      expect(screen.getByText('Test paragraph content')).toBeInTheDocument()
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    test('should maintain layout structure with complex children', () => {
      const complexContent = (
        <div>
          <div data-testid='nested-div'>
            <span>Nested content</span>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </div>
      )

      render(<AppLayout>{complexContent}</AppLayout>)

      expect(screen.getByTestId('nested-div')).toBeInTheDocument()
      expect(screen.getByText('Nested content')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  describe('Navigation Interaction Classes', () => {
    test('should have hover and transition classes on navigation links', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const homeLink = screen.getAllByRole('link', { name: /home/i })[0]
      expect(homeLink).toHaveClass(
        'hover:text-foreground',
        'hover:bg-white/50',
        'transition-all',
        'duration-200'
      )

      const appInfoLink = screen.getAllByRole('link', { name: /app info/i })[0]
      expect(appInfoLink).toHaveClass('transition-all', 'duration-200', 'group')

      const contactLink = screen.getAllByRole('link', { name: /contact/i })[0]
      expect(contactLink).toHaveClass('transition-all', 'duration-200', 'group')
    })

    test('should have group hover effects on icons', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      )

      const homeIcon = screen.getAllByTestId('home-icon')[0]
      expect(homeIcon).toHaveClass(
        'group-hover:scale-110',
        'transition-transform'
      )
    })
  })
})
