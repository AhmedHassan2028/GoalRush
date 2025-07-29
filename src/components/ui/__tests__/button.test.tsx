import { render, screen, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '../button'

describe('Button Component', () => {
  describe('Rendering', () => {
    test('should render button with default props', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me')
    })

    test('should render button with custom className', () => {
      render(<Button className='custom-class'>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    test('should render button as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href='/test'>Link Button</a>
        </Button>
      )
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('Link Button')
      expect(link).toHaveAttribute('href', '/test')
    })

    test('should have data-slot attribute', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-slot', 'button')
    })
  })

  describe('Variants', () => {
    test('should render default variant', () => {
      render(<Button variant='default'>Default</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    test('should render destructive variant', () => {
      render(<Button variant='destructive'>Destructive</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-destructive', 'text-white')
    })

    test('should render outline variant', () => {
      render(<Button variant='outline'>Outline</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border', 'bg-background')
    })

    test('should render secondary variant', () => {
      render(<Button variant='secondary'>Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')
    })

    test('should render ghost variant', () => {
      render(<Button variant='ghost'>Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'hover:bg-accent',
        'hover:text-accent-foreground'
      )
    })

    test('should render link variant', () => {
      render(<Button variant='link'>Link</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-primary', 'underline-offset-4')
    })
  })

  describe('Sizes', () => {
    test('should render default size', () => {
      render(<Button size='default'>Default Size</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9', 'px-4', 'py-2')
    })

    test('should render small size', () => {
      render(<Button size='sm'>Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-8', 'px-3')
    })

    test('should render large size', () => {
      render(<Button size='lg'>Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-6')
    })

    test('should render icon size', () => {
      render(<Button size='icon'>🔥</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('size-9')
    })
  })

  describe('States', () => {
    test('should handle disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass(
        'disabled:pointer-events-none',
        'disabled:opacity-50'
      )
    })

    test('should be focusable when not disabled', () => {
      render(<Button>Focus me</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })
  })

  describe('Events', () => {
    test('should handle click events', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('should not trigger click when disabled', () => {
      const handleClick = jest.fn()
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      )
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    test('should handle keyboard events', () => {
      const handleKeyDown = jest.fn()
      render(<Button onKeyDown={handleKeyDown}>Keyboard</Button>)
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    test('should support aria-label', () => {
      render(<Button aria-label='Custom label'>Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Custom label')
    })

    test('should support aria-describedby', () => {
      render(<Button aria-describedby='description'>Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-describedby', 'description')
    })

    test('should be accessible via screen reader', () => {
      render(<Button>Accessible Button</Button>)
      const button = screen.getByRole('button', { name: 'Accessible Button' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Button Variants Function', () => {
    test('should generate correct classes for default variant', () => {
      const classes = buttonVariants()
      expect(classes).toContain('bg-primary')
      expect(classes).toContain('text-primary-foreground')
      expect(classes).toContain('h-9')
    })

    test('should generate correct classes for custom variant and size', () => {
      const classes = buttonVariants({ variant: 'destructive', size: 'lg' })
      expect(classes).toContain('bg-destructive')
      expect(classes).toContain('h-10')
    })

    test('should handle className parameter', () => {
      const classes = buttonVariants({ className: 'custom-class' })
      expect(classes).toContain('custom-class')
    })
  })

  describe('Complex Scenarios', () => {
    test('should render button with icon and text', () => {
      render(
        <Button>
          <span data-testid='icon'>🔥</span>
          Button with Icon
        </Button>
      )
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('icon')
      expect(button).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(button).toHaveTextContent('Button with Icon')
    })

    test('should work with form submission', () => {
      const handleSubmit = jest.fn(e => e.preventDefault())
      render(
        <form onSubmit={handleSubmit}>
          <Button type='submit'>Submit</Button>
        </form>
      )
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    test('should maintain ref forwarding', () => {
      const ref = { current: null }
      render(<Button ref={ref}>Button</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('asChild Prop', () => {
    test('should render as Slot when asChild is true', () => {
      render(
        <Button asChild>
          <a href='/test'>Link Button</a>
        </Button>
      )
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveTextContent('Link Button')
    })

    test('should render as button when asChild is false', () => {
      render(<Button asChild={false}>Regular Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Regular Button')
    })

    test('should apply button styles to Slot component', () => {
      render(
        <Button asChild variant='destructive' size='lg'>
          <a href='/test'>Styled Link</a>
        </Button>
      )
      const link = screen.getByRole('link')
      expect(link).toHaveClass('bg-destructive', 'h-10', 'px-6')
    })
  })
})
