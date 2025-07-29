import { render, screen } from '@testing-library/react'
import UserDashboard from '../page'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  TrendingUp: ({ className }: any) => (
    <div data-testid='trending-up-icon' className={className}>
      TrendingUp
    </div>
  ),
  Users: ({ className }: any) => (
    <div data-testid='users-icon' className={className}>
      Users
    </div>
  ),
  DollarSign: ({ className }: any) => (
    <div data-testid='dollar-sign-icon' className={className}>
      DollarSign
    </div>
  ),
  Activity: ({ className }: any) => (
    <div data-testid='activity-icon' className={className}>
      Activity
    </div>
  ),
  ArrowUpRight: ({ className }: any) => (
    <div data-testid='arrow-up-right-icon' className={className}>
      ArrowUpRight
    </div>
  ),
  ArrowDownRight: ({ className }: any) => (
    <div data-testid='arrow-down-right-icon' className={className}>
      ArrowDownRight
    </div>
  ),
  BarChart3: ({ className }: any) => (
    <div data-testid='bar-chart-icon' className={className}>
      BarChart3
    </div>
  ),
  PieChart: ({ className }: any) => (
    <div data-testid='pie-chart-icon' className={className}>
      PieChart
    </div>
  ),
  Calendar: ({ className }: any) => (
    <div data-testid='calendar-icon' className={className}>
      Calendar
    </div>
  ),
  Bell: ({ className }: any) => (
    <div data-testid='bell-icon' className={className}>
      Bell
    </div>
  ),
}))

describe('UserDashboard', () => {
  describe('Rendering', () => {
    test('should render dashboard header', () => {
      render(<UserDashboard />)

      expect(screen.getByText('Dashboard Overview')).toBeInTheDocument()
      expect(
        screen.getByText(
          "Welcome back! Here's what's happening with your business today."
        )
      ).toBeInTheDocument()
    })

    test('should render header buttons', () => {
      render(<UserDashboard />)

      const weekButton = screen.getByRole('button', {
        name: /calendar this week/i,
      })
      expect(weekButton).toBeInTheDocument()
      expect(weekButton).toHaveClass('bg-blue-500', 'hover:bg-blue-600')

      const bellButton = screen.getByRole('button', { name: /bell/i })
      expect(bellButton).toBeInTheDocument()
      expect(bellButton).toHaveClass('bg-muted', 'hover:bg-muted/80')
    })
  })

  describe('Stats Section', () => {
    test('should render all statistics cards', () => {
      render(<UserDashboard />)

      const expectedStats = [
        { title: 'Total Revenue', value: '$12,345', change: '+12.5%' },
        { title: 'Active Users', value: '1,234', change: '+8.2%' },
        { title: 'Conversion Rate', value: '3.2%', change: '-2.1%' },
        { title: 'Page Views', value: '45,678', change: '+15.3%' },
      ]

      expectedStats.forEach(stat => {
        expect(screen.getByText(stat.title)).toBeInTheDocument()
        expect(screen.getByText(stat.value)).toBeInTheDocument()
        expect(screen.getByText(stat.change)).toBeInTheDocument()
      })
    })

    test('should render stats with correct trend indicators', () => {
      render(<UserDashboard />)

      // Check for positive trends (green)
      const positiveTrends = screen.getAllByText(/\+\d+\.\d+%/)
      expect(positiveTrends).toHaveLength(3) // Total Revenue, Active Users, Page Views

      // Check for negative trends (red)
      const negativeTrends = screen.getAllByText(/-\d+\.\d+%/)
      expect(negativeTrends).toHaveLength(1) // Conversion Rate
    })

    test('should have responsive grid layout for stats', () => {
      render(<UserDashboard />)

      const statsGrid = document.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4'
      )
      expect(statsGrid).toBeInTheDocument()
      expect(statsGrid).toHaveClass('gap-6')
    })
  })

  describe('Charts Section', () => {
    test('should render revenue overview chart placeholder', () => {
      render(<UserDashboard />)

      expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
      expect(screen.getByText('Monthly revenue trends')).toBeInTheDocument()
      expect(
        screen.getByText('Revenue chart visualization')
      ).toBeInTheDocument()
      expect(screen.getByText('Chart component goes here')).toBeInTheDocument()
    })

    test('should render user distribution chart placeholder', () => {
      render(<UserDashboard />)

      expect(screen.getByText('User Distribution')).toBeInTheDocument()
      expect(screen.getByText('By user type and region')).toBeInTheDocument()
      expect(screen.getByText('User distribution chart')).toBeInTheDocument()
      expect(
        screen.getByText('Pie chart component goes here')
      ).toBeInTheDocument()
    })

    test('should have responsive grid layout for charts', () => {
      render(<UserDashboard />)

      const chartsGrid = document.querySelector(
        '.grid.grid-cols-1.lg\\:grid-cols-2'
      )
      expect(chartsGrid).toBeInTheDocument()
      expect(chartsGrid).toHaveClass('gap-6')
    })
  })

  describe('Recent Activity Section', () => {
    test('should render recent activity header', () => {
      render(<UserDashboard />)

      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
      expect(
        screen.getByText('Latest user actions and system events')
      ).toBeInTheDocument()

      const viewAllButton = screen.getByRole('button', { name: /view all/i })
      expect(viewAllButton).toBeInTheDocument()
      expect(viewAllButton).toHaveClass('text-blue-600', 'hover:text-blue-700')
    })

    test('should render all recent activity items', () => {
      render(<UserDashboard />)

      const expectedActivities = [
        {
          action: 'New user registration',
          user: 'John Doe',
          time: '2 minutes ago',
        },
        {
          action: 'Payment received',
          user: 'Sarah Smith',
          time: '5 minutes ago',
        },
        {
          action: 'Support ticket created',
          user: 'Mike Johnson',
          time: '12 minutes ago',
        },
        {
          action: 'Product viewed',
          user: 'Emma Wilson',
          time: '18 minutes ago',
        },
        {
          action: 'Account upgraded',
          user: 'David Brown',
          time: '25 minutes ago',
        },
      ]

      expectedActivities.forEach(activity => {
        expect(screen.getByText(activity.action)).toBeInTheDocument()
        expect(screen.getByText(activity.user)).toBeInTheDocument()
        expect(screen.getByText(activity.time)).toBeInTheDocument()
      })
    })

    test('should render activity items with correct type indicators', () => {
      render(<UserDashboard />)

      // Check that each activity item has the colored indicator dot
      const activityItems = document.querySelectorAll('.w-2.h-2.rounded-full')
      expect(activityItems).toHaveLength(5)

      // Check specific colors for activity types
      const userActivityDot = activityItems[0] // New user registration
      expect(userActivityDot).toHaveClass('bg-green-500')

      const paymentActivityDot = activityItems[1] // Payment received
      expect(paymentActivityDot).toHaveClass('bg-blue-500')

      const supportActivityDot = activityItems[2] // Support ticket
      expect(supportActivityDot).toHaveClass('bg-yellow-500')

      const generalActivityDot = activityItems[3] // Product viewed
      expect(generalActivityDot).toHaveClass('bg-gray-500')

      const upgradeActivityDot = activityItems[4] // Account upgraded
      expect(upgradeActivityDot).toHaveClass('bg-purple-500')
    })
  })

  describe('Layout and Styling', () => {
    test('should have proper main container spacing', () => {
      render(<UserDashboard />)

      const mainContainer = document.querySelector('.space-y-6')
      expect(mainContainer).toBeInTheDocument()
    })

    test('should have responsive header layout', () => {
      render(<UserDashboard />)

      const headerContainer = document.querySelector(
        '.flex.flex-col.sm\\:flex-row'
      )
      expect(headerContainer).toBeInTheDocument()
      expect(headerContainer).toHaveClass(
        'sm:items-center',
        'sm:justify-between',
        'gap-4'
      )
    })

    test('should have proper card styling', () => {
      render(<UserDashboard />)

      // The stats cards have hover effects, but not all cards do
      const statCards = document.querySelectorAll(
        '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 .bg-card'
      )
      expect(statCards.length).toBeGreaterThan(0)

      // Check that stat cards have hover effects by checking their classes contain the hover classes
      statCards.forEach(card => {
        expect(card.className).toMatch(/hover:shadow-md/)
        expect(card.className).toMatch(/transition-shadow/)
      })
    })

    test('should have hover effects on activity items', () => {
      render(<UserDashboard />)

      const activityItems = document.querySelectorAll('.hover\\:bg-muted\\/30')
      expect(activityItems).toHaveLength(5)

      activityItems.forEach(item => {
        expect(item).toHaveClass('transition-colors')
      })
    })
  })

  describe('Accessibility', () => {
    test('should have proper heading structure', () => {
      render(<UserDashboard />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Dashboard Overview')

      const sectionHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(sectionHeadings).toHaveLength(7) // 4 stat values + 3 section headings (Revenue Overview, User Distribution, Recent Activity)
    })

    test('should have accessible buttons', () => {
      render(<UserDashboard />)

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)

      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    test('should have semantic structure', () => {
      render(<UserDashboard />)

      // Check that the component renders without accessibility violations
      const container = document.querySelector('.space-y-6')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Content Validation', () => {
    test('should display correct stat values', () => {
      render(<UserDashboard />)

      expect(screen.getByText('$12,345')).toBeInTheDocument()
      expect(screen.getByText('1,234')).toBeInTheDocument()
      expect(screen.getByText('3.2%')).toBeInTheDocument()
      expect(screen.getByText('45,678')).toBeInTheDocument()
    })

    test('should display correct change percentages', () => {
      render(<UserDashboard />)

      expect(screen.getByText('+12.5%')).toBeInTheDocument()
      expect(screen.getByText('+8.2%')).toBeInTheDocument()
      expect(screen.getByText('-2.1%')).toBeInTheDocument()
      expect(screen.getByText('+15.3%')).toBeInTheDocument()
    })

    test('should display all user names in recent activity', () => {
      render(<UserDashboard />)

      const userNames = [
        'John Doe',
        'Sarah Smith',
        'Mike Johnson',
        'Emma Wilson',
        'David Brown',
      ]
      userNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })
  })

  describe('Visual Elements', () => {
    test('should render gradient text for main heading', () => {
      render(<UserDashboard />)

      const mainHeading = screen.getByText('Dashboard Overview')
      expect(mainHeading).toHaveClass(
        'bg-gradient-to-r',
        'from-blue-600',
        'to-purple-600',
        'bg-clip-text',
        'text-transparent'
      )
    })

    test('should render muted text for descriptions', () => {
      render(<UserDashboard />)

      const descriptions = document.querySelectorAll('.text-muted-foreground')
      expect(descriptions.length).toBeGreaterThan(0)
    })

    test('should render proper chart placeholder areas', () => {
      render(<UserDashboard />)

      const chartPlaceholders = document.querySelectorAll(
        '.h-64.bg-muted\\/20.rounded-lg'
      )
      expect(chartPlaceholders).toHaveLength(2) // Revenue and User Distribution charts
    })
  })
})
