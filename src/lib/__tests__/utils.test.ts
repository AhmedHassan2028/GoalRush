import { cn } from '../utils'

describe('Utils', () => {
  describe('cn function', () => {
    test('should merge class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500')
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })

    test('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    test('should handle false conditional classes', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class')
    })

    test('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class')
      expect(result).toBe('base-class valid-class')
    })

    test('should handle empty strings', () => {
      const result = cn('base-class', '', 'valid-class')
      expect(result).toBe('base-class valid-class')
    })

    test('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    test('should handle objects with boolean values', () => {
      const result = cn({
        active: true,
        disabled: false,
        primary: true,
      })
      expect(result).toBe('active primary')
    })

    test('should merge conflicting Tailwind classes correctly', () => {
      const result = cn('px-4', 'px-6')
      expect(result).toBe('px-6')
    })

    test('should handle complex combinations', () => {
      const isActive = true
      const isDisabled = false
      const result = cn(
        'base-class',
        ['flex', 'items-center'],
        {
          active: isActive,
          disabled: isDisabled,
        },
        isActive && 'text-blue-500',
        'px-4 px-6' // conflicting classes
      )
      expect(result).toBe(
        'base-class flex items-center active text-blue-500 px-6'
      )
    })

    test('should handle no arguments', () => {
      const result = cn()
      expect(result).toBe('')
    })

    test('should handle single argument', () => {
      const result = cn('single-class')
      expect(result).toBe('single-class')
    })

    test('should handle nested arrays', () => {
      const result = cn(['class1', ['nested1', 'nested2']], 'class3')
      expect(result).toBe('class1 nested1 nested2 class3')
    })
  })
})
