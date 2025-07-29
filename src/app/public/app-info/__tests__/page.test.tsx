import { render, screen } from '@testing-library/react'
import AppInfo from '../page'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Shield: ({ className, ...props }: any) => (
    <div data-testid='shield-icon' className={className} {...props} />
  ),
  Zap: ({ className, ...props }: any) => (
    <div data-testid='zap-icon' className={className} {...props} />
  ),
  Users: ({ className, ...props }: any) => (
    <div data-testid='users-icon' className={className} {...props} />
  ),
  Globe: ({ className, ...props }: any) => (
    <div data-testid='globe-icon' className={className} {...props} />
  ),
  Star: ({ className, ...props }: any) => (
    <div data-testid='star-icon' className={className} {...props} />
  ),
  Smartphone: ({ className, ...props }: any) => (
    <div data-testid='smartphone-icon' className={className} {...props} />
  ),
  Cloud: ({ className, ...props }: any) => (
    <div data-testid='cloud-icon' className={className} {...props} />
  ),
  Lock: ({ className, ...props }: any) => (
    <div data-testid='lock-icon' className={className} {...props} />
  ),
  Code: ({ className, ...props }: any) => (
    <div data-testid='code-icon' className={className} {...props} />
  ),
  Headphones: ({ className, ...props }: any) => (
    <div data-testid='headphones-icon' className={className} {...props} />
  ),
}))

describe('AppInfo', () => {
  describe('Component Rendering', () => {
    test('should render without crashing', () => {
      render(<AppInfo />)

      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument()
    })

    test('should render main container with proper spacing', () => {
      const { container } = render(<AppInfo />)

      expect(container.firstChild).toHaveClass('space-y-12')
    })
  })

  describe('Header Section', () => {
    test('should render main heading with gradient styling', () => {
      render(<AppInfo />)

      const heading = screen.getByText('Welcome to Our Platform')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass(
        'text-4xl',
        'font-bold',
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      )
    })

    test('should render description paragraph', () => {
      render(<AppInfo />)

      const description = screen.getByText(
        /A modern, secure, and scalable application/
      )
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass(
        'text-xl',
        'text-muted-foreground',
        'max-w-3xl',
        'mx-auto'
      )
    })

    test('should render header in centered text layout', () => {
      const { container } = render(<AppInfo />)

      const headerSection = container.querySelector('.text-center')
      expect(headerSection).toBeInTheDocument()
    })
  })

  describe('Stats Section', () => {
    test('should render all four stats items', () => {
      render(<AppInfo />)

      // Check for stat numbers
      expect(screen.getByText('100K+')).toBeInTheDocument()
      expect(screen.getByText('99.9%')).toBeInTheDocument()
      expect(screen.getByText('24/7')).toBeInTheDocument()
      expect(screen.getByText('50+')).toBeInTheDocument()
    })

    test('should render stat labels', () => {
      render(<AppInfo />)

      expect(screen.getByText('Active Users')).toBeInTheDocument()
      expect(screen.getByText('Uptime')).toBeInTheDocument()
      expect(screen.getByText('Support')).toBeInTheDocument()
      expect(screen.getByText('Countries')).toBeInTheDocument()
    })

    test('should render stat icons', () => {
      render(<AppInfo />)

      // Check for icons in stats (some icons appear multiple times)
      expect(screen.getAllByTestId('users-icon')).toHaveLength(2) // Users appears in stats and features
      expect(screen.getAllByTestId('shield-icon')).toHaveLength(2) // Shield appears in stats and features
      expect(screen.getByTestId('headphones-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('globe-icon')).toHaveLength(2) // Globe appears in stats and features
    })

    test('should apply responsive grid layout to stats', () => {
      const { container } = render(<AppInfo />)

      const statsGrid = container.querySelector(
        '.grid.grid-cols-2.md\\:grid-cols-4'
      )
      expect(statsGrid).toBeInTheDocument()
    })

    test('should apply proper styling to stat numbers', () => {
      render(<AppInfo />)

      const statNumber = screen.getByText('100K+')
      expect(statNumber).toHaveClass(
        'text-3xl',
        'font-bold',
        'text-emerald-600'
      )
    })
  })

  describe('Features Section', () => {
    test('should render features section heading', () => {
      render(<AppInfo />)

      const heading = screen.getByText('Key Features')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass(
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      )
    })

    test('should render all six feature items', () => {
      render(<AppInfo />)

      expect(screen.getByText('Secure Authentication')).toBeInTheDocument()
      expect(screen.getByText('Lightning Fast')).toBeInTheDocument()
      expect(screen.getByText('Team Collaboration')).toBeInTheDocument()
      expect(screen.getByText('Global Access')).toBeInTheDocument()
      expect(screen.getByText('Mobile Ready')).toBeInTheDocument()
      expect(screen.getByText('Cloud Integration')).toBeInTheDocument()
    })

    test('should render feature descriptions', () => {
      render(<AppInfo />)

      expect(
        screen.getByText(/Enterprise-grade security with multi-factor/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Optimized performance with sub-second/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Built-in tools for seamless team/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Access your data from anywhere/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Fully responsive design that works/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Seamless integration with popular cloud/)
      ).toBeInTheDocument()
    })

    test('should render feature icons', () => {
      render(<AppInfo />)

      expect(screen.getAllByTestId('shield-icon')).toHaveLength(2) // Stats + Features
      expect(screen.getByTestId('zap-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('users-icon')).toHaveLength(2) // Stats + Features
      expect(screen.getAllByTestId('globe-icon')).toHaveLength(2) // Stats + Features
      expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument()
      expect(screen.getByTestId('cloud-icon')).toBeInTheDocument()
    })

    test('should apply responsive grid layout to features', () => {
      const { container } = render(<AppInfo />)

      const featuresGrid = container.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3'
      )
      expect(featuresGrid).toBeInTheDocument()
    })

    test('should apply hover effects to feature cards', () => {
      const { container } = render(<AppInfo />)

      const featureCards = container.querySelectorAll('.hover\\:shadow-md')
      expect(featureCards.length).toBeGreaterThan(0)

      const hoverTransform = container.querySelectorAll(
        '.hover\\:-translate-y-1'
      )
      expect(hoverTransform.length).toBeGreaterThan(0)
    })

    test('should render feature cards with proper styling', () => {
      const { container } = render(<AppInfo />)

      const featureCard = container.querySelector(
        '.bg-card.rounded-xl.p-6.border'
      )
      expect(featureCard).toBeInTheDocument()
    })
  })

  describe('Technology Stack Section', () => {
    test('should render technology section heading', () => {
      render(<AppInfo />)

      const heading = screen.getByText('Built With Modern Tech')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass(
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      )
    })

    test('should render all technology items', () => {
      render(<AppInfo />)

      expect(screen.getByText('Next.js')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
      expect(screen.getByText('Clerk')).toBeInTheDocument()
      expect(screen.getByText('Vercel')).toBeInTheDocument()
      expect(screen.getByText('Prisma')).toBeInTheDocument()
    })

    test('should render technology descriptions', () => {
      render(<AppInfo />)

      expect(
        screen.getByText('React framework for production')
      ).toBeInTheDocument()
      expect(screen.getByText('Type-safe JavaScript')).toBeInTheDocument()
      expect(
        screen.getByText('Utility-first CSS framework')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Authentication & user management')
      ).toBeInTheDocument()
      expect(screen.getByText('Deployment platform')).toBeInTheDocument()
      expect(screen.getByText('Database toolkit')).toBeInTheDocument()
    })

    test('should apply responsive grid layout to technologies', () => {
      const { container } = render(<AppInfo />)

      const techGrid = container.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3'
      )
      expect(techGrid).toBeInTheDocument()
    })

    test('should render technology items with indicators', () => {
      const { container } = render(<AppInfo />)

      const indicators = container.querySelectorAll(
        '.w-3.h-3.bg-emerald-500.rounded-full'
      )
      expect(indicators).toHaveLength(6) // One for each technology
    })

    test('should apply hover effects to technology items', () => {
      const { container } = render(<AppInfo />)

      const hoverEffects = container.querySelectorAll(
        '.hover\\:border-emerald-200'
      )
      expect(hoverEffects.length).toBeGreaterThan(0)
    })
  })

  describe('Call to Action Section', () => {
    test('should render CTA heading', () => {
      render(<AppInfo />)

      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
    })

    test('should render CTA description', () => {
      render(<AppInfo />)

      expect(
        screen.getByText(/Join thousands of users who trust our platform/)
      ).toBeInTheDocument()
    })

    test('should render CTA buttons', () => {
      render(<AppInfo />)

      expect(
        screen.getByRole('button', { name: /start free trial/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /learn more/i })
      ).toBeInTheDocument()
    })

    test('should apply proper styling to primary CTA button', () => {
      render(<AppInfo />)

      const primaryButton = screen.getByRole('button', {
        name: /start free trial/i,
      })
      expect(primaryButton).toHaveClass(
        'px-8',
        'py-3',
        'bg-emerald-600',
        'hover:bg-emerald-700',
        'text-white',
        'rounded-lg',
        'font-semibold',
        'transition-colors'
      )
    })

    test('should apply proper styling to secondary CTA button', () => {
      render(<AppInfo />)

      const secondaryButton = screen.getByRole('button', {
        name: /learn more/i,
      })
      expect(secondaryButton).toHaveClass(
        'px-8',
        'py-3',
        'border',
        'border-emerald-600',
        'text-emerald-600',
        'rounded-lg',
        'font-semibold',
        'transition-colors'
      )
    })

    test('should render CTA section with gradient background', () => {
      const { container } = render(<AppInfo />)

      const ctaSection = container.querySelector(
        '.bg-gradient-to-r.from-emerald-500\\/10.to-teal-500\\/10'
      )
      expect(ctaSection).toBeInTheDocument()
    })

    test('should apply responsive flex layout to CTA buttons', () => {
      const { container } = render(<AppInfo />)

      const buttonContainer = container.querySelector(
        '.flex.flex-col.sm\\:flex-row.gap-4.justify-center'
      )
      expect(buttonContainer).toBeInTheDocument()
    })
  })

  describe('Data Structure and Dynamic Rendering', () => {
    test('should render exact number of feature items from data array', () => {
      const { container } = render(<AppInfo />)

      // Count feature cards
      const featureCards = container.querySelectorAll(
        '.bg-card.rounded-xl.p-6.border'
      )
      expect(featureCards).toHaveLength(6)
    })

    test('should render exact number of stat items from data array', () => {
      const { container } = render(<AppInfo />)

      // Count stat items in the stats grid
      const statsGrid = container.querySelector(
        '.grid.grid-cols-2.md\\:grid-cols-4'
      )
      const statItems = statsGrid?.children
      expect(statItems).toHaveLength(4)
    })

    test('should render exact number of technology items from data array', () => {
      const { container } = render(<AppInfo />)

      // Count technology items
      const techItems = container.querySelectorAll(
        '.w-3.h-3.bg-emerald-500.rounded-full'
      )
      expect(techItems).toHaveLength(6)
    })

    test('should handle different feature colors correctly', () => {
      const { container } = render(<AppInfo />)

      // Check that different color classes are applied
      const coloredElements = container.querySelectorAll(
        '[class*="text-emerald-"], [class*="text-yellow-"], [class*="text-blue-"], [class*="text-purple-"], [class*="text-pink-"], [class*="text-cyan-"]'
      )
      expect(coloredElements.length).toBeGreaterThan(0)
    })
  })

  describe('CSS Classes and Styling', () => {
    test('should apply dark mode classes', () => {
      const { container } = render(<AppInfo />)

      // Check for dark mode variants
      expect(
        container.querySelector('[class*="dark:from-emerald-400"]')
      ).toBeInTheDocument()
      expect(
        container.querySelector('[class*="dark:to-teal-400"]')
      ).toBeInTheDocument()
      expect(
        container.querySelector('[class*="dark:bg-emerald-900"]')
      ).toBeInTheDocument()
    })

    test('should apply gradient text classes', () => {
      render(<AppInfo />)

      const gradientHeadings = screen.getAllByText(
        /Welcome to Our Platform|Key Features|Built With Modern Tech/
      )
      gradientHeadings.forEach(heading => {
        expect(heading).toHaveClass('bg-gradient-to-r')
        expect(heading).toHaveClass('bg-clip-text')
        expect(heading).toHaveClass('text-transparent')
      })
    })

    test('should apply responsive spacing classes', () => {
      const { container } = render(<AppInfo />)

      expect(container.querySelector('.space-y-12')).toBeInTheDocument()
      expect(container.querySelector('.max-w-3xl')).toBeInTheDocument()
      expect(container.querySelector('.max-w-2xl')).toBeInTheDocument()
    })

    test('should apply transition effects', () => {
      const { container } = render(<AppInfo />)

      expect(container.querySelector('.transition-all')).toBeInTheDocument()
      expect(container.querySelector('.transition-colors')).toBeInTheDocument()
      expect(container.querySelector('.duration-300')).toBeInTheDocument()
    })
  })

  describe('Icon Integration', () => {
    test('should render all unique icons from the imported set', () => {
      render(<AppInfo />)

      // Check that all different icon types are present
      expect(screen.getAllByTestId('shield-icon')).toHaveLength(2)
      expect(screen.getByTestId('zap-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('users-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('globe-icon')).toHaveLength(2)
      expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument()
      expect(screen.getByTestId('cloud-icon')).toBeInTheDocument()
      expect(screen.getByTestId('headphones-icon')).toBeInTheDocument()
    })

    test('should apply correct styling to icons', () => {
      const { container } = render(<AppInfo />)

      // Check for icon sizing classes
      const icons = container.querySelectorAll('[class*="h-6 w-6"]')
      expect(icons.length).toBeGreaterThan(0)
    })

    test('should render icons within proper containers', () => {
      const { container } = render(<AppInfo />)

      // Check for icon containers
      const iconContainers = container.querySelectorAll(
        '.inline-flex.items-center.justify-center'
      )
      expect(iconContainers.length).toBeGreaterThan(0)
    })
  })

  describe('Layout and Structure', () => {
    test('should maintain proper section hierarchy', () => {
      const { container } = render(<AppInfo />)

      // Check for proper heading hierarchy
      expect(container.querySelector('h1')).toBeInTheDocument()
      expect(container.querySelectorAll('h2')).toHaveLength(3)
      expect(container.querySelectorAll('h3')).toHaveLength(6) // Feature titles
      expect(container.querySelectorAll('h4')).toHaveLength(6) // Technology titles
    })

    test('should apply proper semantic structure', () => {
      const { container } = render(<AppInfo />)

      // Check for proper use of semantic elements
      expect(container.querySelector('h1')).toBeInTheDocument()
      expect(container.querySelector('p')).toBeInTheDocument()
      expect(container.querySelector('button')).toBeInTheDocument()
    })

    test('should maintain consistent spacing throughout sections', () => {
      const { container } = render(<AppInfo />)

      // Check for consistent margin/padding classes
      expect(container.querySelector('.mb-4')).toBeInTheDocument()
      expect(container.querySelector('.mb-12')).toBeInTheDocument()
      expect(container.querySelector('.p-6')).toBeInTheDocument()
      expect(container.querySelector('.p-8')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should have proper button roles', () => {
      render(<AppInfo />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)

      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    test('should have proper heading structure for screen readers', () => {
      render(<AppInfo />)

      // Check heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3)
    })

    test('should provide meaningful text content', () => {
      render(<AppInfo />)

      // Check that all major content sections have text
      expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument()
      expect(screen.getByText('Key Features')).toBeInTheDocument()
      expect(screen.getByText('Built With Modern Tech')).toBeInTheDocument()
      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
    })
  })
})
