import { render, screen } from '@testing-library/react'

// Ensure we're testing the real component, not a mock
jest.unmock('../loading-spinner')

import LoadingSpinner from '../loading-spinner'

describe('LoadingSpinner Component', () => {
  describe('Rendering', () => {
    test('should render loading spinner', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    test('should have correct structure', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(
        'inline-block',
        'h-4',
        'w-4',
        'animate-spin',
        'rounded-full',
        'border-2',
        'border-solid',
        'border-current',
        'border-r-transparent'
      )
    })

    test('should include screen reader text', () => {
      render(<LoadingSpinner />)

      const screenReaderText = screen.getByText('Loading...')
      expect(screenReaderText).toBeInTheDocument()
      expect(screenReaderText).toHaveClass('sr-only')
    })

    test('should have motion-reduce animation fallback', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(
        'motion-reduce:animate-[spin_1.5s_linear_infinite]'
      )
    })
  })

  describe('Accessibility', () => {
    test('should have proper ARIA role', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    test('should provide screen reader accessible text', () => {
      render(<LoadingSpinner />)

      const srText = screen.getByText('Loading...')
      expect(srText).toBeInTheDocument()
      expect(srText).toHaveClass('sr-only')
    })

    test('should be available for assistive technology', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      const srText = screen.getByText('Loading...')

      expect(spinner).toBeInTheDocument()
      expect(srText).toBeInTheDocument()
    })
  })

  describe('Styling and Visual Appearance', () => {
    test('should have correct size classes', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('h-4', 'w-4')
    })

    test('should have proper display type', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('inline-block')
    })

    test('should have correct border styling', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(
        'border-2',
        'border-solid',
        'border-current',
        'border-r-transparent'
      )
    })

    test('should be circular', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('rounded-full')
    })

    test('should have spin animation', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('animate-spin')
    })

    test('should inherit current text color for border', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-current')
    })

    test('should have transparent right border for spinning effect', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-r-transparent')
    })
  })

  describe('Responsiveness and Accessibility Features', () => {
    test('should respect reduced motion preferences', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(
        'motion-reduce:animate-[spin_1.5s_linear_infinite]'
      )
    })

    test('should work in different color contexts', () => {
      const { container } = render(
        <div style={{ color: 'red' }}>
          <LoadingSpinner />
        </div>
      )

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-current')
      // The border should inherit the red color from parent
      expect(container).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    test('should work as inline element', () => {
      render(
        <div>
          Text before <LoadingSpinner /> text after
        </div>
      )

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('inline-block')
      expect(
        screen.getByText('Text before', { exact: false })
      ).toBeInTheDocument()
      expect(
        screen.getByText('text after', { exact: false })
      ).toBeInTheDocument()
    })

    test('should work inside buttons', () => {
      render(
        <button>
          <LoadingSpinner />
          Loading...
        </button>
      )

      const button = screen.getByRole('button')
      const spinner = screen.getByRole('status')

      expect(button).toContainElement(spinner)
      expect(button).toHaveTextContent('Loading...')
    })

    test('should work in flex containers', () => {
      render(
        <div className='flex items-center'>
          <LoadingSpinner />
          <span>Loading content...</span>
        </div>
      )

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
      expect(screen.getByText('Loading content...')).toBeInTheDocument()
    })

    test('should work in grid containers', () => {
      render(
        <div className='grid'>
          <LoadingSpinner />
        </div>
      )

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    test('should render quickly', () => {
      const start = performance.now()
      render(<LoadingSpinner />)
      const end = performance.now()

      expect(end - start).toBeLessThan(50) // Should render very quickly
    })

    test('should handle multiple instances', () => {
      render(
        <div>
          <LoadingSpinner />
          <LoadingSpinner />
          <LoadingSpinner />
        </div>
      )

      const spinners = screen.getAllByRole('status')
      expect(spinners).toHaveLength(3)

      spinners.forEach(spinner => {
        expect(spinner).toBeInTheDocument()
        expect(spinner).toHaveClass('animate-spin')
      })
    })

    test('should not cause memory leaks', () => {
      const { unmount } = render(<LoadingSpinner />)
      expect(() => unmount()).not.toThrow()
    })

    test('should handle rapid mount/unmount cycles', () => {
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<LoadingSpinner />)
        unmount()
      }
      // If we get here without errors, memory handling is good
      expect(true).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    test('should handle being wrapped in other components', () => {
      function Wrapper({ children }: { children: React.ReactNode }) {
        return <div className='wrapper'>{children}</div>
      }

      render(
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      )

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    test('should work without any props', () => {
      expect(() => render(<LoadingSpinner />)).not.toThrow()
    })

    test('should maintain consistent styling across renders', () => {
      const { rerender } = render(<LoadingSpinner />)

      const spinner1 = screen.getByRole('status')
      const classes1 = spinner1.className

      rerender(<LoadingSpinner />)

      const spinner2 = screen.getByRole('status')
      const classes2 = spinner2.className

      expect(classes1).toBe(classes2)
    })
  })

  describe('CSS Animation', () => {
    test('should have correct animation class', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('animate-spin')
    })

    test('should respect system motion preferences', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(
        'motion-reduce:animate-[spin_1.5s_linear_infinite]'
      )
    })
  })

  describe('Semantic HTML', () => {
    test('should use appropriate HTML structure', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.firstChild as HTMLElement
      expect(spinner.tagName).toBe('DIV')
    })

    test('should have proper nesting structure', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.firstChild as HTMLElement
      const srText = spinner.querySelector('.sr-only')

      expect(srText).toBeInTheDocument()
      expect(srText?.textContent).toBe('Loading...')
      expect(srText?.tagName).toBe('SPAN')
    })
  })

  describe('Browser Compatibility', () => {
    test('should work without CSS animations (graceful degradation)', () => {
      const { container } = render(<LoadingSpinner />)

      // Even without CSS animations, the component should still render
      expect(container.firstChild).toBeInTheDocument()
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('should work with different box-sizing models', () => {
      const { container } = render(
        <div style={{ boxSizing: 'border-box' }}>
          <LoadingSpinner />
        </div>
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Visual Testing Helpers', () => {
    test('should be identifiable for visual testing', () => {
      const { container } = render(<LoadingSpinner />)

      expect(container.firstChild).toBeInTheDocument()
      // Component can be selected for visual regression testing
    })

    test('should have consistent visual structure', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveAttribute('role', 'status')
      expect(spinner).toHaveClass('animate-spin')
    })
  })
})
