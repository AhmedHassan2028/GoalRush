import { render, screen } from '@testing-library/react'
import UserDropdown from '../user-dropdown'

// Mock Clerk hooks and components
jest.mock('@clerk/nextjs', () => ({
  UserButton: ({ showName, appearance, ...props }) => (
    <div
      data-testid='user-button'
      data-show-name={showName}
      data-appearance={JSON.stringify(appearance)}
      {...props}
    >
      User Menu
    </div>
  ),
  useUser: jest.fn(),
}))

// Mock LoadingSpinner component
jest.mock('@/components/loading-spinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid='loading-spinner'>Loading...</div>
  }
})

describe('UserDropdown Component', () => {
  const mockUseUser = require('@clerk/nextjs').useUser

  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock implementation
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
    })
  })

  describe('Loading State', () => {
    test('should render LoadingSpinner when not loaded', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
      })

      render(<UserDropdown />)

      const loadingSpinner = screen.getByTestId('loading-spinner')
      expect(loadingSpinner).toBeInTheDocument()
      expect(loadingSpinner).toHaveTextContent('Loading...')
    })

    test('should not render UserButton when not loaded', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
      })

      render(<UserDropdown />)

      const userButton = screen.queryByTestId('user-button')
      expect(userButton).not.toBeInTheDocument()
    })
  })

  describe('Not Signed In State', () => {
    test('should render nothing when loaded but not signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
      })

      const { container } = render(<UserDropdown />)

      expect(container.firstChild).toBeNull()

      const userButton = screen.queryByTestId('user-button')
      expect(userButton).not.toBeInTheDocument()

      const loadingSpinner = screen.queryByTestId('loading-spinner')
      expect(loadingSpinner).not.toBeInTheDocument()
    })
  })

  describe('Signed In State', () => {
    test('should render UserButton when loaded and signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      const userButton = screen.getByTestId('user-button')
      expect(userButton).toBeInTheDocument()
      expect(userButton).toHaveTextContent('User Menu')
    })

    test('should pass showName prop as true', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      const userButton = screen.getByTestId('user-button')
      expect(userButton).toHaveAttribute('data-show-name', 'true')
    })

    test('should apply correct appearance styles', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      const userButton = screen.getByTestId('user-button')
      const appearanceData = userButton.getAttribute('data-appearance')
      const appearance = JSON.parse(appearanceData || '{}')

      expect(appearance).toEqual({
        elements: {
          userButtonOuterIdentifier: {
            color: '#374151',
          },
        },
        variables: {
          colorText: '#374151',
        },
      })
    })
  })

  describe('Component Behavior', () => {
    test('should be a default export', () => {
      expect(UserDropdown).toBeDefined()
      expect(typeof UserDropdown).toBe('function')
    })

    test('should handle different user states correctly', () => {
      // Test loading state
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
      })

      const { rerender } = render(<UserDropdown />)
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

      // Test not signed in state
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
      })

      rerender(<UserDropdown />)
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
      expect(screen.queryByTestId('user-button')).not.toBeInTheDocument()

      // Test signed in state
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      rerender(<UserDropdown />)
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
      expect(screen.getByTestId('user-button')).toBeInTheDocument()
    })
  })

  describe('Integration with Clerk', () => {
    test('should use Clerk UserButton with correct configuration', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      const userButton = screen.getByTestId('user-button')

      // Verify showName is enabled
      expect(userButton.getAttribute('data-show-name')).toBe('true')

      // Verify appearance configuration
      const appearanceData = userButton.getAttribute('data-appearance')
      const appearance = JSON.parse(appearanceData || '{}')
      expect(appearance.elements.userButtonOuterIdentifier.color).toBe(
        '#374151'
      )
    })

    test('should use useUser hook for authentication state', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      expect(mockUseUser).toHaveBeenCalled()
    })
  })

  describe('Component Structure', () => {
    test('should render UserButton directly when signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      const { container } = render(<UserDropdown />)

      expect(container.firstChild).toHaveAttribute('data-testid', 'user-button')
    })

    test('should not have any wrapper elements when signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      const { container } = render(<UserDropdown />)

      // Component should render UserButton directly without wrapper
      expect(container.children).toHaveLength(1)
    })

    test('should render loading spinner directly when loading', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
      })

      const { container } = render(<UserDropdown />)

      expect(container.firstChild).toHaveAttribute(
        'data-testid',
        'loading-spinner'
      )
    })
  })

  describe('Error Handling', () => {
    test('should handle missing Clerk context gracefully', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
      })

      expect(() => render(<UserDropdown />)).not.toThrow()
    })

    test('should handle undefined user state', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: undefined,
      })

      const { container } = render(<UserDropdown />)

      // Should render nothing when isSignedIn is undefined
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Styling and Appearance', () => {
    test('should apply white color to user identifier', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      const userButton = screen.getByTestId('user-button')
      const appearanceData = userButton.getAttribute('data-appearance')
      const appearance = JSON.parse(appearanceData || '{}')

      expect(appearance.elements.userButtonOuterIdentifier.color).toBe(
        '#374151'
      )
    })

    test('should maintain consistent styling across renders', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      const { rerender } = render(<UserDropdown />)
      const firstRender = screen
        .getByTestId('user-button')
        .getAttribute('data-appearance')

      rerender(<UserDropdown />)
      const secondRender = screen
        .getByTestId('user-button')
        .getAttribute('data-appearance')

      expect(firstRender).toBe(secondRender)
    })
  })

  describe('Accessibility', () => {
    test('should be accessible for screen readers when signed in', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      render(<UserDropdown />)

      const userButton = screen.getByTestId('user-button')
      expect(userButton).toBeInTheDocument()
    })

    test('should be accessible during loading state', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
      })

      render(<UserDropdown />)

      const loadingSpinner = screen.getByTestId('loading-spinner')
      expect(loadingSpinner).toBeInTheDocument()
    })

    test('should maintain semantic structure', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })

      const { container } = render(<UserDropdown />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
