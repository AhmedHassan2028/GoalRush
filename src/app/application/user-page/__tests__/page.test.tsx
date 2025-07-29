import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserAccount from '../page'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  User: () => <div data-testid='user-icon' />,
  Mail: () => <div data-testid='mail-icon' />,
  Phone: () => <div data-testid='phone-icon' />,
  MapPin: () => <div data-testid='mappin-icon' />,
  Calendar: () => <div data-testid='calendar-icon' />,
  Shield: () => <div data-testid='shield-icon' />,
  Settings: () => <div data-testid='settings-icon' />,
  Edit: () => <div data-testid='edit-icon' />,
  Camera: () => <div data-testid='camera-icon' />,
  Award: () => <div data-testid='award-icon' />,
  Clock: () => <div data-testid='clock-icon' />,
  TrendingUp: () => <div data-testid='trending-up-icon' />,
}))

describe('UserAccount Component', () => {
  beforeEach(() => {
    render(<UserAccount />)
  })

  describe('Component Rendering', () => {
    test('should render without crashing', () => {
      const userProfileHeading = screen.getByText('User Profile')
      expect(userProfileHeading).toBeInTheDocument()
    })

    test('should render the main heading with correct text and styling', () => {
      const heading = screen.getByText('User Profile')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-3xl', 'font-bold')
    })

    test('should render the subtitle', () => {
      const subtitle = screen.getByText(
        'Manage your account settings and preferences'
      )
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveClass('text-muted-foreground')
    })

    test('should render the Edit Profile button', () => {
      const editButton = screen.getByRole('button', { name: /edit profile/i })
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveClass('bg-blue-500', 'hover:bg-blue-600')
    })

    test('should render Edit Profile button with correct icon', () => {
      const editIcon = screen.getByTestId('edit-icon')
      expect(editIcon).toBeInTheDocument()
    })
  })

  describe('User Information Card', () => {
    test('should render user name', () => {
      const userName = screen.getByText('Alex Johnson')
      expect(userName).toBeInTheDocument()
      expect(userName).toHaveClass('text-2xl', 'font-bold')
    })

    test('should render user avatar with initials', () => {
      const avatar = screen.getByText('AJ')
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveClass('text-2xl', 'font-bold')
    })

    test('should render camera button for avatar editing', () => {
      const cameraIcon = screen.getByTestId('camera-icon')
      expect(cameraIcon).toBeInTheDocument()
    })

    test('should render verified badge when user is verified', () => {
      const verifiedBadge = screen.getByText('Verified')
      expect(verifiedBadge).toBeInTheDocument()
      expect(verifiedBadge).toHaveClass('bg-green-100')
    })

    test('should render verified badge with shield icon', () => {
      const shieldIcon = screen.getByTestId('shield-icon')
      expect(shieldIcon).toBeInTheDocument()
    })

    test('should render user role', () => {
      const userRole = screen.getByText('Premium Member')
      expect(userRole).toBeInTheDocument()
      expect(userRole).toHaveClass('bg-purple-100')
    })

    test('should render user email with mail icon', () => {
      const userEmail = screen.getByText('alex.johnson@email.com')
      expect(userEmail).toBeInTheDocument()
      const mailIcon = screen.getByTestId('mail-icon')
      expect(mailIcon).toBeInTheDocument()
    })

    test('should render user phone with phone icon', () => {
      const userPhone = screen.getByText('+1 (555) 123-4567')
      expect(userPhone).toBeInTheDocument()
      const phoneIcon = screen.getByTestId('phone-icon')
      expect(phoneIcon).toBeInTheDocument()
    })

    test('should render user location with map pin icon', () => {
      const userLocation = screen.getByText('San Francisco, CA')
      expect(userLocation).toBeInTheDocument()
      const mapPinIcon = screen.getByTestId('mappin-icon')
      expect(mapPinIcon).toBeInTheDocument()
    })

    test('should render user join date with calendar icon', () => {
      const joinDate = screen.getByText('Member since March 2023')
      expect(joinDate).toBeInTheDocument()
      const calendarIcons = screen.getAllByTestId('calendar-icon')
      expect(calendarIcons.length).toBeGreaterThan(0)
      expect(calendarIcons[0]).toBeInTheDocument()
    })
  })

  describe('Account Statistics', () => {
    test('should render all account statistics', () => {
      expect(screen.getByText('2,847')).toBeInTheDocument()
      expect(screen.getByText('Profile Views')).toBeInTheDocument()

      expect(screen.getByText('34')).toBeInTheDocument()
      expect(screen.getByText('Total Orders')).toBeInTheDocument()

      expect(screen.getByText('1,256')).toBeInTheDocument()
      expect(screen.getByText('Loyalty Points')).toBeInTheDocument()

      expect(screen.getByText('1.5 years')).toBeInTheDocument()
      expect(screen.getByText('Account Age')).toBeInTheDocument()
    })

    test('should render all account statistics icons', () => {
      const trendingUpIcon = screen.getByTestId('trending-up-icon')
      expect(trendingUpIcon).toBeInTheDocument()

      const calendarIcons = screen.getAllByTestId('calendar-icon')
      expect(calendarIcons.length).toBeGreaterThan(0)

      const awardIcon = screen.getByTestId('award-icon')
      expect(awardIcon).toBeInTheDocument()

      const clockIcon = screen.getByTestId('clock-icon')
      expect(clockIcon).toBeInTheDocument()
    })

    test('should render account statistics with proper styling', () => {
      const profileViewsCard = screen
        .getByText('Profile Views')
        .closest('.bg-card')
      expect(profileViewsCard).toHaveClass('bg-card', 'rounded-xl', 'p-6')
    })
  })

  describe('Recent Orders Section', () => {
    test('should render Recent Orders heading', () => {
      const heading = screen.getByText('Recent Orders')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-lg', 'font-semibold')
    })

    test('should render Recent Orders description', () => {
      const description = screen.getByText(
        'Your latest purchases and subscriptions'
      )
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-muted-foreground')
    })

    test('should render View All button', () => {
      const viewAllButton = screen.getByRole('button', { name: /view all/i })
      expect(viewAllButton).toBeInTheDocument()
      expect(viewAllButton).toHaveClass('text-blue-600')
    })

    test('should render all order items', () => {
      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()
      expect(screen.getByText('Mobile App Pro')).toBeInTheDocument()
      expect(screen.getByText('Cloud Storage 1TB')).toBeInTheDocument()
      expect(screen.getByText('API Access Plan')).toBeInTheDocument()
    })

    test('should render order IDs and dates', () => {
      expect(screen.getByText('ORD-001 • 2024-01-15')).toBeInTheDocument()
      expect(screen.getByText('ORD-002 • 2024-01-10')).toBeInTheDocument()
      expect(screen.getByText('ORD-003 • 2024-01-05')).toBeInTheDocument()
      expect(screen.getByText('ORD-004 • 2023-12-28')).toBeInTheDocument()
    })

    test('should render order amounts', () => {
      expect(screen.getByText('$29.99')).toBeInTheDocument()
      expect(screen.getByText('$19.99')).toBeInTheDocument()
      expect(screen.getByText('$9.99')).toBeInTheDocument()
      expect(screen.getByText('$49.99')).toBeInTheDocument()
    })

    test('should render order statuses with proper styling', () => {
      const activeStatus = screen.getAllByText('Active')
      expect(activeStatus).toHaveLength(2)
      activeStatus.forEach(status => {
        expect(status).toHaveClass('bg-green-100')
      })

      const completedStatus = screen.getByText('Completed')
      expect(completedStatus).toHaveClass('bg-blue-100')

      const expiredStatus = screen.getByText('Expired')
      expect(expiredStatus).toHaveClass('bg-gray-100')
    })
  })

  describe('Account Preferences Section', () => {
    test('should render Account Preferences heading', () => {
      const heading = screen.getByText('Account Preferences')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-lg', 'font-semibold')
    })

    test('should render Account Preferences description', () => {
      const description = screen.getByText('Manage your account settings')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-muted-foreground')
    })

    test('should render settings icon button', () => {
      const settingsIcon = screen.getByTestId('settings-icon')
      expect(settingsIcon).toBeInTheDocument()
    })

    test('should render all preference categories', () => {
      expect(screen.getByText('Notifications')).toBeInTheDocument()
      expect(screen.getByText('Privacy')).toBeInTheDocument()
      expect(screen.getByText('Security')).toBeInTheDocument()
      expect(screen.getByText('Marketing')).toBeInTheDocument()
    })

    test('should render all preference settings', () => {
      expect(
        screen.getByText('Email notifications enabled')
      ).toBeInTheDocument()
      expect(screen.getByText('Profile visibility: Public')).toBeInTheDocument()
      expect(screen.getByText('Two-factor authentication')).toBeInTheDocument()
      expect(screen.getByText('Promotional emails')).toBeInTheDocument()
    })

    test('should render toggle switches with correct states', () => {
      const toggleSwitches = document.querySelectorAll('.w-12')
      expect(toggleSwitches.length).toBe(4)

      // First three toggles should be enabled (blue)
      expect(toggleSwitches[0]).toHaveClass('bg-blue-500')
      expect(toggleSwitches[1]).toHaveClass('bg-blue-500')
      expect(toggleSwitches[2]).toHaveClass('bg-blue-500')

      // Last toggle should be disabled (gray)
      expect(toggleSwitches[3]).toHaveClass('bg-gray-300')
    })

    test('should render toggle switch positions correctly', () => {
      const toggles = document.querySelectorAll('.w-5.h-5')

      // Enabled toggles should be translated to the right
      const enabledToggles = Array.from(toggles).slice(0, 3)
      enabledToggles.forEach(toggle => {
        expect(toggle).toHaveClass('translate-x-6')
      })

      // Disabled toggle should be at the left
      const disabledToggle = toggles[3]
      expect(disabledToggle).toHaveClass('translate-x-0.5')
    })
  })

  describe('Layout and Responsive Design', () => {
    test('should have proper grid layout for account stats', () => {
      const statsGrid = screen.getByText('Profile Views').closest('.grid')
      expect(statsGrid).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-4'
      )
    })

    test('should have proper grid layout for orders and preferences', () => {
      const mainGrid = screen.getByText('Recent Orders').closest('.grid')
      expect(mainGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
    })

    test('should have responsive header layout', () => {
      const header = screen.getByText('User Profile').closest('.flex')
      expect(header).toHaveClass('flex-col', 'sm:flex-row')
    })

    test('should have responsive user info layout', () => {
      const userInfoContainer = screen
        .getByText('Alex Johnson')
        .closest('.flex-1')?.parentElement
      expect(userInfoContainer).toHaveClass('flex-col', 'sm:flex-row')
    })
  })

  describe('Component Structure and Accessibility', () => {
    test('should have proper semantic structure', () => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
    })

    test('should have accessible buttons', () => {
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    test('should render with proper spacing', () => {
      const mainContainer = screen
        .getByText('User Profile')
        .closest('.space-y-8')
      expect(mainContainer).toHaveClass('space-y-8')
    })
  })

  describe('Data Rendering', () => {
    test('should render all user info data correctly', () => {
      expect(screen.getByText('Alex Johnson')).toBeInTheDocument()
      expect(screen.getByText('alex.johnson@email.com')).toBeInTheDocument()
      expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('Member since March 2023')).toBeInTheDocument()
    })

    test('should handle verified user state correctly', () => {
      const verifiedBadge = screen.getByText('Verified')
      expect(verifiedBadge).toBeInTheDocument()
    })

    test('should render all statistics correctly', () => {
      const stats = ['2,847', '34', '1,256', '1.5 years']
      stats.forEach(stat => {
        expect(screen.getByText(stat)).toBeInTheDocument()
      })
    })

    test('should render all order data correctly', () => {
      const orderData = [
        'Premium Subscription',
        'Mobile App Pro',
        'Cloud Storage 1TB',
        'API Access Plan',
      ]
      orderData.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })

    test('should render all preference data correctly', () => {
      const preferences = [
        'Email notifications enabled',
        'Profile visibility: Public',
        'Two-factor authentication',
        'Promotional emails',
      ]
      preferences.forEach(pref => {
        expect(screen.getByText(pref)).toBeInTheDocument()
      })
    })
  })

  describe('CSS Classes and Styling', () => {
    test('should apply gradient text styling to heading', () => {
      const heading = screen.getByText('User Profile')
      expect(heading).toHaveClass(
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      )
    })

    test('should apply proper card styling', () => {
      const cards = document.querySelectorAll('.bg-card')
      expect(cards.length).toBeGreaterThan(0)
      cards.forEach(card => {
        expect(card).toHaveClass('rounded-xl', 'border')
      })
    })

    test('should apply hover effects correctly', () => {
      const hoverableElements = document.querySelectorAll('.hover\\:shadow-md')
      expect(hoverableElements.length).toBeGreaterThan(0)
    })

    test('should apply transition effects', () => {
      const transitionElements = document.querySelectorAll(
        '.transition-colors, .transition-shadow, .transition-transform'
      )
      expect(transitionElements.length).toBeGreaterThan(0)
    })
  })
})
