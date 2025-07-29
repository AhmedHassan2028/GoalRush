// Mock the Clerk modules - define mocks first to avoid hoisting issues
jest.mock('@clerk/nextjs/server', () => {
  const mockIsProtectedRoute = jest.fn()
  return {
    clerkMiddleware: jest.fn(fn => fn),
    createRouteMatcher: jest.fn(() => mockIsProtectedRoute),
    __mockIsProtectedRoute: mockIsProtectedRoute, // Export for testing access
  }
})

// Import components after mocking
import { config } from '../middleware'
import middlewareFunction from '../middleware'

// Get mock access
const { __mockIsProtectedRoute: mockIsProtectedRoute } = jest.requireMock(
  '@clerk/nextjs/server'
) as any
const mockProtect = jest.fn()

// Mock objects for testing
const getMockAuth = () => ({
  protect: mockProtect,
})

const getMockReq = (pathname: string) => ({
  url: '',
  nextUrl: {
    pathname,
  },
})

describe('Middleware', () => {
  describe('Configuration', () => {
    test('should export config with correct structure', () => {
      expect(config).toBeDefined()
      expect(config.matcher).toBeDefined()
      expect(Array.isArray(config.matcher)).toBe(true)
    })

    test('should have correct matcher patterns', () => {
      expect(config.matcher).toHaveLength(2)

      // First pattern: Skip Next.js internals and static files
      const firstPattern = config.matcher[0]
      expect(firstPattern).toBe(
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
      )

      // Second pattern: API and TRPC routes
      const secondPattern = config.matcher[1]
      expect(secondPattern).toBe('/(api|trpc)(.*)')
    })
  })

  describe('Route Matching Logic', () => {
    test('should match API routes', () => {
      const apiPattern = config.matcher[1]
      const regex = new RegExp(apiPattern)

      expect(regex.test('/api/users')).toBe(true)
      expect(regex.test('/api/auth/signin')).toBe(true)
      expect(regex.test('/trpc/users.getAll')).toBe(true)
      expect(regex.test('/trpc/auth')).toBe(true)
    })

    test('should match protected pages', () => {
      const pagePattern = config.matcher[0]
      // Don't slice the pattern, use it as-is since it's already a regex pattern
      const regex = new RegExp(pagePattern)

      expect(regex.test('/dashboard')).toBe(true)
      expect(regex.test('/profile')).toBe(true)
      expect(regex.test('/settings')).toBe(true)
      expect(regex.test('/')).toBe(true)
    })

    test('should exclude Next.js internals', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/_next/static/chunks/main.js')).toBe(false)
      expect(regex.test('/_next/static/css/styles.css')).toBe(false)
      expect(regex.test('/_next/image')).toBe(true) // _next/image is an API endpoint, not a static file
    })

    test('should exclude static files', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/favicon.ico')).toBe(false)
      expect(regex.test('/logo.png')).toBe(false)
      expect(regex.test('/styles.css')).toBe(false)
      expect(regex.test('/script.js')).toBe(false)
      expect(regex.test('/document.pdf')).toBe(true) // PDF files are not in the excluded list
      expect(regex.test('/data.json')).toBe(true) // JSON files are not excluded
      expect(regex.test('/image.jpg')).toBe(false)
      expect(regex.test('/image.jpeg')).toBe(false)
      expect(regex.test('/image.webp')).toBe(false)
      expect(regex.test('/image.png')).toBe(false)
      expect(regex.test('/image.gif')).toBe(false)
      expect(regex.test('/image.svg')).toBe(false)
      expect(regex.test('/font.ttf')).toBe(false)
      expect(regex.test('/font.woff')).toBe(false)
      expect(regex.test('/font.woff2')).toBe(false)
      expect(regex.test('/data.csv')).toBe(false)
      expect(regex.test('/document.docx')).toBe(false)
      expect(regex.test('/spreadsheet.xlsx')).toBe(false)
      expect(regex.test('/archive.zip')).toBe(false)
      expect(regex.test('/manifest.webmanifest')).toBe(false)
    })

    test('should include .json files in API context', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      // JSON files with search params should be included
      expect(regex.test('/api/data.json?param=value')).toBe(true)
    })
  })

  describe('File Extension Patterns', () => {
    test('should exclude HTML files', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/page.html')).toBe(false)
      expect(regex.test('/index.htm')).toBe(false)
    })

    test('should exclude CSS files', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/styles.css')).toBe(false)
      expect(regex.test('/global.css')).toBe(false)
    })

    test('should exclude JavaScript files but include JSON', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/script.js')).toBe(false)
      expect(regex.test('/config.json')).toBe(true) // JSON should be included
    })

    test('should exclude various image formats', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      const imageFormats = [
        '/image.jpg',
        '/image.jpeg',
        '/image.webp',
        '/image.png',
        '/image.gif',
        '/image.svg',
      ]

      imageFormats.forEach(path => {
        expect(regex.test(path)).toBe(false)
      })
    })

    test('should exclude font files', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      const fontFormats = ['/font.ttf', '/font.woff', '/font.woff2']

      fontFormats.forEach(path => {
        expect(regex.test(path)).toBe(false)
      })
    })

    test('should exclude document files', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      const documentFormats = [
        '/document.ico',
        '/data.csv',
        '/document.docx',
        '/spreadsheet.xlsx',
        '/archive.zip',
        '/manifest.webmanifest',
      ]

      documentFormats.forEach(path => {
        expect(regex.test(path)).toBe(false)
      })
    })
  })

  describe('Middleware Function Logic', () => {
    beforeEach(() => {
      // Reset all mocks before each test
      jest.clearAllMocks()
    })

    test('should call auth.protect when route is protected', async () => {
      // Setup mocks
      mockIsProtectedRoute.mockReturnValue(true)
      const mockAuth = getMockAuth()
      const mockReq = getMockReq('/application/dashboard')

      // Execute middleware function
      await middlewareFunction(mockAuth as any, mockReq as any)

      // Verify auth.protect was called
      expect(mockIsProtectedRoute).toHaveBeenCalledWith(mockReq)
      expect(mockProtect).toHaveBeenCalledTimes(1)
    })

    test('should not call auth.protect when route is not protected', async () => {
      // Setup mocks
      mockIsProtectedRoute.mockReturnValue(false)
      const mockAuth = getMockAuth()
      const mockReq = getMockReq('/')

      // Execute middleware function
      await middlewareFunction(mockAuth as any, mockReq as any)

      // Verify auth.protect was not called
      expect(mockIsProtectedRoute).toHaveBeenCalledWith(mockReq)
      expect(mockProtect).not.toHaveBeenCalled()
    })

    test('should handle protected routes with different paths', async () => {
      // Test various protected route paths
      const protectedPaths = [
        '/application',
        '/application/dashboard',
        '/application/profile',
        '/application/settings',
      ]

      for (const path of protectedPaths) {
        mockIsProtectedRoute.mockReturnValue(true)
        const mockAuth = getMockAuth()
        const mockReq = getMockReq(path)

        await middlewareFunction(mockAuth as any, mockReq as any)

        expect(mockIsProtectedRoute).toHaveBeenCalledWith(mockReq)
        expect(mockProtect).toHaveBeenCalled()

        // Reset for next iteration
        jest.clearAllMocks()
      }
    })

    test('should handle non-protected routes with different paths', async () => {
      // Test various non-protected route paths
      const publicPaths = ['/', '/about', '/contact', '/api/public']

      for (const path of publicPaths) {
        mockIsProtectedRoute.mockReturnValue(false)
        const mockAuth = getMockAuth()
        const mockReq = getMockReq(path)

        await middlewareFunction(mockAuth as any, mockReq as any)

        expect(mockIsProtectedRoute).toHaveBeenCalledWith(mockReq)
        expect(mockProtect).not.toHaveBeenCalled()

        // Reset for next iteration
        jest.clearAllMocks()
      }
    })
  })

  describe('Integration', () => {
    test('should import clerkMiddleware correctly', async () => {
      const { clerkMiddleware } = await import('@clerk/nextjs/server')
      expect(clerkMiddleware).toBeDefined()
      expect(typeof clerkMiddleware).toBe('function')
    })

    test('should export middleware as default', async () => {
      const middlewareModule = await import('../middleware')
      expect(middlewareModule.default).toBeDefined()
      expect(typeof middlewareModule.default).toBe('function')
    })
  })

  describe('Edge Cases', () => {
    test('should handle nested API routes', () => {
      const apiPattern = config.matcher[1]
      const regex = new RegExp(apiPattern)

      expect(regex.test('/api/v1/users')).toBe(true)
      expect(regex.test('/api/v1/auth/signin')).toBe(true)
      expect(regex.test('/trpc/nested/route')).toBe(true)
    })

    test('should handle root level routes', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/')).toBe(true)
      expect(regex.test('/about')).toBe(true)
      expect(regex.test('/contact')).toBe(true)
    })

    test('should handle query parameters', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/search?q=test')).toBe(true)
      expect(regex.test('/api/data?format=json')).toBe(true)
    })

    test('should handle trailing slashes', () => {
      const patterns = config.matcher
      const pageRegex = new RegExp(patterns[0])
      const apiRegex = new RegExp(patterns[1])

      expect(pageRegex.test('/dashboard/')).toBe(true)
      expect(apiRegex.test('/api/users/')).toBe(true)
    })

    test('should handle case sensitivity', () => {
      const pagePattern = config.matcher[0]
      const regex = new RegExp(pagePattern)

      expect(regex.test('/Dashboard')).toBe(true)
      expect(regex.test('/SETTINGS')).toBe(true)
    })
  })
})
