import { render, screen } from '@testing-library/react'
import ContactUs from '../page'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Mail: ({ className, ...props }: any) => (
    <div data-testid='mail-icon' className={className} {...props} />
  ),
  Phone: ({ className, ...props }: any) => (
    <div data-testid='phone-icon' className={className} {...props} />
  ),
  MapPin: ({ className, ...props }: any) => (
    <div data-testid='mappin-icon' className={className} {...props} />
  ),
  Clock: ({ className, ...props }: any) => (
    <div data-testid='clock-icon' className={className} {...props} />
  ),
  Send: ({ className, ...props }: any) => (
    <div data-testid='send-icon' className={className} {...props} />
  ),
  MessageSquare: ({ className, ...props }: any) => (
    <div data-testid='messagesquare-icon' className={className} {...props} />
  ),
  Headphones: ({ className, ...props }: any) => (
    <div data-testid='headphones-icon' className={className} {...props} />
  ),
  Users: ({ className, ...props }: any) => (
    <div data-testid='users-icon' className={className} {...props} />
  ),
}))

describe('ContactUs', () => {
  describe('Component Rendering', () => {
    test('should render without crashing', () => {
      render(<ContactUs />)

      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    })

    test('should render main container with proper spacing', () => {
      const { container } = render(<ContactUs />)

      expect(container.firstChild).toHaveClass('space-y-12')
    })
  })

  describe('Header Section', () => {
    test('should render main heading with gradient styling', () => {
      render(<ContactUs />)

      const heading = screen.getByText('Get in Touch')
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
      render(<ContactUs />)

      const description = screen.getByText(/Have questions or need support/)
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass(
        'text-xl',
        'text-muted-foreground',
        'max-w-3xl',
        'mx-auto'
      )
    })

    test('should render header in centered text layout', () => {
      const { container } = render(<ContactUs />)

      const headerSection = container.querySelector('.text-center')
      expect(headerSection).toBeInTheDocument()
    })
  })

  describe('Support Stats Section', () => {
    test('should render all four support stats', () => {
      render(<ContactUs />)

      // Check for stat values
      expect(screen.getByText('50+')).toBeInTheDocument()
      expect(screen.getByText('< 2hrs')).toBeInTheDocument()
      expect(screen.getByText('10K+')).toBeInTheDocument()
      expect(screen.getByText('98%')).toBeInTheDocument()
    })

    test('should render support stat labels', () => {
      render(<ContactUs />)

      expect(screen.getByText('Support Agents')).toBeInTheDocument()
      expect(screen.getByText('Avg Response Time')).toBeInTheDocument()
      expect(screen.getByText('Tickets Resolved')).toBeInTheDocument()
      expect(screen.getByText('Customer Satisfaction')).toBeInTheDocument()
    })

    test('should render support stat icons', () => {
      render(<ContactUs />)

      // Check for icons in stats
      expect(screen.getAllByTestId('users-icon')).toHaveLength(1)
      expect(screen.getAllByTestId('clock-icon')).toHaveLength(4) // Stats + offices
      expect(screen.getAllByTestId('messagesquare-icon')).toHaveLength(2) // Stats + contact methods
      expect(screen.getAllByTestId('phone-icon')).toHaveLength(5) // Stats + contact methods + offices
    })

    test('should apply responsive grid layout to support stats', () => {
      const { container } = render(<ContactUs />)

      const statsGrid = container.querySelector(
        '.grid.grid-cols-2.md\\:grid-cols-4'
      )
      expect(statsGrid).toBeInTheDocument()
    })

    test('should apply proper styling to support stat values', () => {
      render(<ContactUs />)

      const statValue = screen.getByText('50+')
      expect(statValue).toHaveClass('text-2xl', 'font-bold', 'text-emerald-600')
    })
  })

  describe('Contact Methods Section', () => {
    test('should render contact methods section heading', () => {
      render(<ContactUs />)

      const heading = screen.getByText('How Can We Help?')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass(
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      )
    })

    test('should render all four contact methods', () => {
      render(<ContactUs />)

      expect(screen.getByText('Email Support')).toBeInTheDocument()
      expect(screen.getByText('Phone Support')).toBeInTheDocument()
      expect(screen.getByText('Live Chat')).toBeInTheDocument()
      expect(screen.getByText('Help Center')).toBeInTheDocument()
    })

    test('should render contact method descriptions', () => {
      render(<ContactUs />)

      expect(
        screen.getByText('Get help via email within 24 hours')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Talk to our support team directly')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Chat with our team in real-time')
      ).toBeInTheDocument()
      expect(screen.getByText('Browse our knowledge base')).toBeInTheDocument()
    })

    test('should render contact method contact information', () => {
      render(<ContactUs />)

      expect(screen.getByText('support@platform.com')).toBeInTheDocument()
      expect(screen.getAllByText('+1 (555) 123-4567')).toHaveLength(2) // Contact methods + office
      expect(screen.getByText('Available 9 AM - 6 PM EST')).toBeInTheDocument()
      expect(screen.getByText('500+ articles and guides')).toBeInTheDocument()
    })

    test('should render contact method action buttons', () => {
      render(<ContactUs />)

      expect(
        screen.getByRole('button', { name: /send email/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /call now/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /start chat/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /browse faq/i })
      ).toBeInTheDocument()
    })

    test('should render contact method icons', () => {
      render(<ContactUs />)

      expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('phone-icon')).toHaveLength(5) // Contact + stats + offices
      expect(screen.getAllByTestId('messagesquare-icon')).toHaveLength(2) // Contact + stats
      expect(screen.getByTestId('headphones-icon')).toBeInTheDocument()
    })

    test('should apply responsive grid layout to contact methods', () => {
      const { container } = render(<ContactUs />)

      const contactGrid = container.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2'
      )
      expect(contactGrid).toBeInTheDocument()
    })

    test('should apply hover effects to contact method cards', () => {
      const { container } = render(<ContactUs />)

      const contactCards = container.querySelectorAll('.hover\\:shadow-md')
      expect(contactCards.length).toBeGreaterThan(0)

      const hoverTransform = container.querySelectorAll(
        '.hover\\:-translate-y-1'
      )
      expect(hoverTransform.length).toBeGreaterThan(0)
    })

    test('should apply different color schemes to contact method buttons', () => {
      render(<ContactUs />)

      const emailButton = screen.getByRole('button', { name: /send email/i })
      expect(emailButton).toHaveClass('bg-emerald-600', 'hover:bg-emerald-700')

      const phoneButton = screen.getByRole('button', { name: /call now/i })
      expect(phoneButton).toHaveClass('bg-blue-600', 'hover:bg-blue-700')

      const chatButton = screen.getByRole('button', { name: /start chat/i })
      expect(chatButton).toHaveClass('bg-purple-600', 'hover:bg-purple-700')

      const faqButton = screen.getByRole('button', { name: /browse faq/i })
      expect(faqButton).toHaveClass('bg-orange-600', 'hover:bg-orange-700')
    })
  })

  describe('Contact Form Section', () => {
    test('should render contact form heading', () => {
      render(<ContactUs />)

      expect(screen.getByText('Send us a Message')).toBeInTheDocument()
    })

    test('should render form input fields', () => {
      render(<ContactUs />)

      expect(screen.getByPlaceholderText('John')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('john@example.com')
      ).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Tell us how we can help you...')
      ).toBeInTheDocument()
    })

    test('should render form labels', () => {
      render(<ContactUs />)

      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Subject')).toBeInTheDocument()
      expect(screen.getByText('Message')).toBeInTheDocument()
    })

    test('should render select dropdown with options', () => {
      render(<ContactUs />)

      expect(screen.getByText('General Inquiry')).toBeInTheDocument()
      expect(screen.getByText('Technical Support')).toBeInTheDocument()
      expect(screen.getByText('Billing Question')).toBeInTheDocument()
      expect(screen.getByText('Feature Request')).toBeInTheDocument()
      expect(screen.getByText('Partnership')).toBeInTheDocument()
    })

    test('should render form submit button with icon', () => {
      render(<ContactUs />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveClass(
        'w-full',
        'bg-emerald-600',
        'hover:bg-emerald-700'
      )
      expect(screen.getByTestId('send-icon')).toBeInTheDocument()
    })

    test('should apply proper form styling', () => {
      const { container } = render(<ContactUs />)

      const formContainer = container.querySelector(
        '.bg-card.rounded-xl.p-8.border.shadow-sm'
      )
      expect(formContainer).toBeInTheDocument()
    })

    test('should render form with proper spacing', () => {
      const { container } = render(<ContactUs />)

      const form = container.querySelector('form.space-y-6')
      expect(form).toBeInTheDocument()
    })

    test('should render input fields with proper focus styling', () => {
      const { container } = render(<ContactUs />)

      const inputs = container.querySelectorAll(
        '.focus\\:ring-2.focus\\:ring-emerald-500'
      )
      expect(inputs.length).toBeGreaterThan(0)
    })
  })

  describe('Office Locations Section', () => {
    test('should render office locations heading', () => {
      render(<ContactUs />)

      expect(screen.getByText('Our Offices')).toBeInTheDocument()
    })

    test('should render all three office locations', () => {
      render(<ContactUs />)

      expect(screen.getByText('San Francisco')).toBeInTheDocument()
      expect(screen.getByText('New York')).toBeInTheDocument()
      expect(screen.getByText('London')).toBeInTheDocument()
    })

    test('should render office addresses', () => {
      render(<ContactUs />)

      expect(
        screen.getByText('123 Tech Street, SF, CA 94105')
      ).toBeInTheDocument()
      expect(
        screen.getByText('456 Business Ave, NYC, NY 10001')
      ).toBeInTheDocument()
      expect(
        screen.getByText('789 Innovation Lane, London, UK')
      ).toBeInTheDocument()
    })

    test('should render office phone numbers', () => {
      render(<ContactUs />)

      // Note: +1 (555) 123-4567 appears in contact methods too
      expect(screen.getAllByText('+1 (555) 123-4567')).toHaveLength(2)
      expect(screen.getByText('+1 (555) 987-6543')).toBeInTheDocument()
      expect(screen.getByText('+44 20 7123 4567')).toBeInTheDocument()
    })

    test('should render office hours', () => {
      render(<ContactUs />)

      expect(screen.getByText('Mon-Fri: 9 AM - 6 PM PST')).toBeInTheDocument()
      expect(screen.getByText('Mon-Fri: 9 AM - 6 PM EST')).toBeInTheDocument()
      expect(screen.getByText('Mon-Fri: 9 AM - 5 PM GMT')).toBeInTheDocument()
    })

    test('should render office location icons', () => {
      render(<ContactUs />)

      expect(screen.getAllByTestId('mappin-icon')).toHaveLength(3)
      expect(screen.getAllByTestId('phone-icon')).toHaveLength(5) // Contact + stats + offices
      expect(screen.getAllByTestId('clock-icon')).toHaveLength(4) // Stats + offices
    })

    test('should apply proper styling to office cards', () => {
      const { container } = render(<ContactUs />)

      const officeCards = container.querySelectorAll(
        '.bg-card.rounded-xl.p-6.border.shadow-sm'
      )
      expect(officeCards.length).toBeGreaterThan(3) // Includes contact form + office cards
    })

    test('should style office city names with emerald color', () => {
      render(<ContactUs />)

      const sanFrancisco = screen.getByText('San Francisco')
      expect(sanFrancisco).toHaveClass('text-emerald-600')
    })
  })

  describe('FAQ Preview Section', () => {
    test('should render FAQ preview heading', () => {
      render(<ContactUs />)

      expect(screen.getByText('Looking for Quick Answers?')).toBeInTheDocument()
    })

    test('should render FAQ preview description', () => {
      render(<ContactUs />)

      expect(
        screen.getByText(/Check out our comprehensive FAQ section/)
      ).toBeInTheDocument()
    })

    test('should render FAQ preview CTA button', () => {
      render(<ContactUs />)

      expect(
        screen.getByRole('button', { name: /visit help center/i })
      ).toBeInTheDocument()
    })

    test('should apply gradient background to FAQ section', () => {
      const { container } = render(<ContactUs />)

      const faqSection = container.querySelector(
        '.bg-gradient-to-r.from-emerald-500\\/10.to-teal-500\\/10'
      )
      expect(faqSection).toBeInTheDocument()
    })

    test('should apply proper styling to FAQ CTA button', () => {
      render(<ContactUs />)

      const ctaButton = screen.getByRole('button', {
        name: /visit help center/i,
      })
      expect(ctaButton).toHaveClass(
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
  })

  describe('Data Structure and Dynamic Rendering', () => {
    test('should render exact number of contact method cards from data array', () => {
      const { container } = render(<ContactUs />)

      // Count contact method cards specifically (not including form or office cards)
      const contactMethodsGrid = container.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2.gap-8'
      )
      const contactCards = contactMethodsGrid?.children
      expect(contactCards).toHaveLength(4)
    })

    test('should render exact number of support stat items from data array', () => {
      const { container } = render(<ContactUs />)

      // Count stat items in the stats grid
      const statsGrid = container.querySelector(
        '.grid.grid-cols-2.md\\:grid-cols-4'
      )
      const statItems = statsGrid?.children
      expect(statItems).toHaveLength(4)
    })

    test('should render exact number of office location items from data array', () => {
      render(<ContactUs />)

      // Count office location cards by city names
      expect(screen.getByText('San Francisco')).toBeInTheDocument()
      expect(screen.getByText('New York')).toBeInTheDocument()
      expect(screen.getByText('London')).toBeInTheDocument()

      // Verify we have exactly 3 offices
      expect(screen.getAllByTestId('mappin-icon')).toHaveLength(3)
    })

    test('should handle different contact method colors correctly', () => {
      const { container } = render(<ContactUs />)

      // Check that different color classes are applied to buttons
      const emeraldButton = container.querySelector(
        '.bg-emerald-600.hover\\:bg-emerald-700'
      )
      const blueButton = container.querySelector(
        '.bg-blue-600.hover\\:bg-blue-700'
      )
      const purpleButton = container.querySelector(
        '.bg-purple-600.hover\\:bg-purple-700'
      )
      const orangeButton = container.querySelector(
        '.bg-orange-600.hover\\:bg-orange-700'
      )

      expect(emeraldButton).toBeInTheDocument()
      expect(blueButton).toBeInTheDocument()
      expect(purpleButton).toBeInTheDocument()
      expect(orangeButton).toBeInTheDocument()
    })

    test('should render all select dropdown options from data', () => {
      render(<ContactUs />)

      // Verify all 5 dropdown options are present
      expect(screen.getByText('General Inquiry')).toBeInTheDocument()
      expect(screen.getByText('Technical Support')).toBeInTheDocument()
      expect(screen.getByText('Billing Question')).toBeInTheDocument()
      expect(screen.getByText('Feature Request')).toBeInTheDocument()
      expect(screen.getByText('Partnership')).toBeInTheDocument()
    })
  })

  describe('Form Elements and Input Types', () => {
    test('should render different input types correctly', () => {
      const { container } = render(<ContactUs />)

      // Check for different input types
      expect(container.querySelector('input[type="text"]')).toBeInTheDocument()
      expect(container.querySelector('input[type="email"]')).toBeInTheDocument()
      expect(container.querySelector('select')).toBeInTheDocument()
      expect(container.querySelector('textarea')).toBeInTheDocument()
    })

    test('should render textarea with correct attributes', () => {
      const { container } = render(<ContactUs />)

      const textarea = container.querySelector('textarea')
      expect(textarea).toHaveAttribute('rows', '5')
      expect(textarea).toHaveClass('resize-none')
    })

    test('should render submit button with correct type', () => {
      const { container } = render(<ContactUs />)

      const submitButton = container.querySelector('button[type="submit"]')
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    test('should apply dark mode classes', () => {
      const { container } = render(<ContactUs />)

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
      render(<ContactUs />)

      const gradientHeadings = screen.getAllByText(
        /Get in Touch|How Can We Help/
      )
      gradientHeadings.forEach(heading => {
        expect(heading).toHaveClass('bg-gradient-to-r')
        expect(heading).toHaveClass('bg-clip-text')
        expect(heading).toHaveClass('text-transparent')
      })
    })

    test('should apply responsive spacing classes', () => {
      const { container } = render(<ContactUs />)

      expect(container.querySelector('.space-y-12')).toBeInTheDocument()
      expect(container.querySelector('.space-y-6')).toBeInTheDocument()
      expect(container.querySelector('.space-y-3')).toBeInTheDocument()
    })

    test('should apply transition effects', () => {
      const { container } = render(<ContactUs />)

      expect(container.querySelector('.transition-all')).toBeInTheDocument()
      expect(container.querySelector('.transition-colors')).toBeInTheDocument()
      expect(container.querySelector('.duration-300')).toBeInTheDocument()
    })

    test('should apply proper grid layouts for different sections', () => {
      const { container } = render(<ContactUs />)

      expect(
        container.querySelector('.grid.grid-cols-2.md\\:grid-cols-4')
      ).toBeInTheDocument() // Stats
      expect(
        container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2')
      ).toBeInTheDocument() // Contact methods and form inputs
      expect(
        container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2')
      ).toBeInTheDocument() // Form and offices
    })
  })

  describe('Icon Integration', () => {
    test('should render all unique icons from the imported set', () => {
      render(<ContactUs />)

      // Check that all different icon types are present
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('phone-icon')).toHaveLength(5)
      expect(screen.getAllByTestId('mappin-icon')).toHaveLength(3)
      expect(screen.getAllByTestId('clock-icon')).toHaveLength(4)
      expect(screen.getByTestId('send-icon')).toBeInTheDocument()
      expect(screen.getAllByTestId('messagesquare-icon')).toHaveLength(2)
      expect(screen.getByTestId('headphones-icon')).toBeInTheDocument()
      expect(screen.getByTestId('users-icon')).toBeInTheDocument()
    })

    test('should apply correct sizing to different icon contexts', () => {
      const { container } = render(<ContactUs />)

      // Check for different icon sizes
      const largeIcons = container.querySelectorAll('.h-6.w-6')
      const mediumIcons = container.querySelectorAll('.h-5.w-5')
      const smallIcons = container.querySelectorAll('.h-4.w-4')

      expect(largeIcons.length).toBeGreaterThan(0)
      expect(mediumIcons.length).toBeGreaterThan(0)
      expect(smallIcons.length).toBeGreaterThan(0)
    })

    test('should render icons within proper containers', () => {
      const { container } = render(<ContactUs />)

      // Check for icon containers
      const iconContainers = container.querySelectorAll(
        '.inline-flex.items-center.justify-center'
      )
      expect(iconContainers.length).toBeGreaterThan(0)
    })
  })

  describe('Layout and Structure', () => {
    test('should maintain proper section hierarchy', () => {
      const { container } = render(<ContactUs />)

      // Check for proper heading hierarchy
      expect(container.querySelector('h1')).toBeInTheDocument()
      expect(container.querySelectorAll('h2')).toHaveLength(2) // Contact methods + FAQ
      expect(container.querySelectorAll('h3')).toHaveLength(6) // Contact methods + form heading
      expect(container.querySelectorAll('h4')).toHaveLength(3) // Office cities
    })

    test('should apply proper semantic structure', () => {
      const { container } = render(<ContactUs />)

      // Check for proper use of semantic elements
      expect(container.querySelector('h1')).toBeInTheDocument()
      expect(container.querySelector('form')).toBeInTheDocument()
      expect(
        container.querySelector('button[type="submit"]')
      ).toBeInTheDocument()
      expect(container.querySelector('label')).toBeInTheDocument()
    })

    test('should maintain responsive layout structure', () => {
      const { container } = render(<ContactUs />)

      // Check for responsive layout classes
      expect(container.querySelector('.lg\\:grid-cols-2')).toBeInTheDocument()
      expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument()
      expect(container.querySelector('.md\\:grid-cols-4')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should have proper button roles', () => {
      render(<ContactUs />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(6) // 4 contact method buttons + 1 submit + 1 CTA

      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    test('should have proper form labels', () => {
      render(<ContactUs />)

      // Check that form has proper labels
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Subject')).toBeInTheDocument()
      expect(screen.getByText('Message')).toBeInTheDocument()
    })

    test('should have proper heading structure for screen readers', () => {
      render(<ContactUs />)

      // Check heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2)
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
      expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(3)
    })

    test('should provide meaningful text content', () => {
      render(<ContactUs />)

      // Check that all major content sections have text
      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
      expect(screen.getByText('How Can We Help?')).toBeInTheDocument()
      expect(screen.getByText('Send us a Message')).toBeInTheDocument()
      expect(screen.getByText('Our Offices')).toBeInTheDocument()
      expect(screen.getByText('Looking for Quick Answers?')).toBeInTheDocument()
    })
  })
})
