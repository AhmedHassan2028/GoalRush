# AI Agent Development Guide

## Project Overview

**Repository:** nextjs-clerk-template  
**Type:** Next.js 15 Template with Authentication  
**Purpose:** Production-ready starter template for modern web applications  
**Architecture:** Full-stack React application with server-side rendering

## Core Technologies

- **Framework:** Next.js 15.3.4 (App Router)
- **Runtime:** React 19.0.0 (latest features)
- **Language:** TypeScript 5.0+ (strict mode)
- **Authentication:** Clerk 6.22.0 (complete auth solution)
- **Styling:** Tailwind CSS 4.0 + Shadcn/ui components
- **Testing:** Jest + Playwright (unit + E2E)
- **Build:** Standard Webpack (Turbopack optional)

## Project Structure

```
nextjs-clerk-template/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout with Clerk provider
│   │   ├── page.tsx               # Modern homepage with gradient design
│   │   ├── user-dropdown.tsx      # User authentication dropdown
│   │   ├── __tests__/             # Page-level tests with comprehensive coverage
│   │   ├── application/           # Protected application pages
│   │   │   ├── layout.tsx         # Application-specific layout
│   │   │   ├── dashboard/         # User dashboard with analytics
│   │   │   │   └── page.tsx       # Dashboard page with stats and charts
│   │   │   └── user-page/         # User profile page
│   │   │       └── page.tsx       # User page component
│   │   └── public/                # Public pages (no auth required)
│   │       ├── layout.tsx         # Public layout
│   │       ├── app-info/          # Application information page
│   │       │   └── page.tsx       # Detailed app info and features
│   │       └── contact-us/        # Contact page
│   │           └── page.tsx       # Contact form and information
│   ├── components/                # Reusable UI components
│   │   ├── auth-buttons.tsx       # Authentication buttons (sign in/up)
│   │   ├── auth-redirect.tsx      # Authentication redirect handler
│   │   ├── error-boundary.tsx     # Error boundary component
│   │   ├── loading-spinner.tsx    # Loading spinner component
│   │   ├── theme-switch.tsx       # Dark/light mode toggle
│   │   ├── ui/                    # Shadcn/ui components
│   │   │   └── button.tsx         # Button component
│   │   └── __tests__/             # Component tests with full coverage
│   ├── actions/                   # Server actions directory
│   ├── contexts/                  # React contexts directory
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions and configurations
│   │   └── utils.ts              # Utility functions (clsx, cn)
│   ├── types/                     # TypeScript type definitions
│   ├── utils/                     # Additional utility functions
│   ├── styles/                    # Global styles and CSS modules
│   │   └── globals.css           # Global CSS with Tailwind and theme vars
│   ├── middleware.ts             # Clerk authentication middleware
│   └── __tests__/                # Global test files and helpers
│       ├── integration/          # Integration tests
│       ├── middleware.test.ts    # Middleware tests
│       └── utils/                # Test helper utilities
├── e2e/                          # Playwright end-to-end tests
│   └── app.spec.ts              # E2E test specifications
├── coverage/                     # Test coverage reports
├── public/                       # Static assets
│   ├── icon.svg                 # App icon
│   ├── manifest.json            # PWA manifest
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # SEO sitemap
├── .env.example                  # Environment variables template
├── components.json               # Shadcn/ui configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration with security headers
├── jest.config.js                # Jest testing configuration
├── jest.setup.js                 # Jest setup file
├── playwright.config.ts          # Playwright E2E configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── .prettierrc                   # Prettier configuration
└── tsconfig.json                 # TypeScript configuration with path mapping
```

## Key Dependencies

### Production Dependencies

```json
{
  "@clerk/nextjs": "^6.22.0", // Complete authentication & user management solution
  "@radix-ui/react-slot": "^1.2.3", // Primitive component slots for flexible composition
  "class-variance-authority": "^0.7.1", // Type-safe component variant management
  "clsx": "^2.1.1", // Conditional CSS class utility
  "lucide-react": "^0.518.0", // Beautiful & consistent icon library
  "next": "15.3.4", // React framework with App Router
  "react": "^19.0.0", // Latest React with concurrent features
  "react-dom": "^19.0.0", // React DOM rendering
  "tailwind-merge": "^3.3.1" // Smart Tailwind class merging utility
}
```

### Development Dependencies

```json
{
  "@eslint/eslintrc": "^3", // ESLint configuration management
  "@tailwindcss/postcss": "^4", // PostCSS integration for Tailwind v4
  "@types/node": "^20", // Node.js type definitions
  "@types/react": "^19", // React 19 type definitions
  "@types/react-dom": "^19", // React DOM type definitions
  "@playwright/test": "^1.49.0", // End-to-end testing framework
  "@testing-library/dom": "^10.4.0", // DOM testing utilities
  "@testing-library/jest-dom": "^6.6.3", // Custom Jest matchers for DOM
  "@testing-library/react": "^16.1.0", // React component testing utilities
  "@testing-library/user-event": "^14.5.2", // User interaction simulation
  "@types/jest": "^29.5.14", // Jest type definitions
  "eslint": "^9", // JavaScript/TypeScript linter
  "eslint-config-next": "15.3.4", // Next.js specific ESLint rules
  "eslint-config-prettier": "^10.1.5", // Prettier integration for ESLint
  "eslint-plugin-prettier": "^5.5.0", // Prettier as ESLint plugin
  "jest": "^29.7.0", // JavaScript testing framework
  "jest-environment-jsdom": "^29.7.0", // JSDOM environment for Jest
  "prettier": "^3.5.3", // Code formatter
  "tailwindcss": "^4", // Utility-first CSS framework v4
  "ts-jest": "^29.2.5", // TypeScript transformer for Jest
  "ts-node": "^10.9.2", // TypeScript execution for Node.js
  "tw-animate-css": "^1.3.4" // Additional animation utilities for Tailwind
}
```

## Environment Variables

### Required Variables

```bash
# Application Configuration
NEXT_PUBLIC_APP_NAME=Your_Awesome_App_Name     # App name displayed in navigation and metadata

# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # Clerk publishable key for client-side
CLERK_SECRET_KEY=sk_test_...                   # Clerk secret key for server-side operations
```

### Getting Clerk Keys

1. Create account at https://clerk.dev/
2. Create new application in dashboard
3. Navigate to "API Keys" section
4. Copy publishable key (starts with `pk_test_` or `pk_live_`)
5. Copy secret key (starts with `sk_test_` or `sk_live_`)

## Available Scripts

### Development Commands

```bash
npm run dev          # Start development server (standard mode)
npm run build        # Create optimized production build
npm run start        # Start production server (requires build first)
```

### Code Quality Commands

```bash
npm run lint         # Run ESLint checks on entire codebase
npm run lint:fix     # Automatically fix ESLint issues where possible
npm run format       # Format all files with Prettier
npm run format:check # Check if files are properly formatted (CI)
```

### Testing Commands

```bash
npm run test              # Run Jest unit tests
npm run test:watch        # Run tests in watch mode (development)
npm run test:coverage     # Generate test coverage report
npm run test:e2e          # Run Playwright E2E tests (headless)
npm run test:e2e:ui       # Run E2E tests with Playwright UI
npm run test:e2e:headed   # Run E2E tests with visible browser
npm run test:all          # Run all tests (unit + E2E with coverage)
```

## Authentication Flow

### Clerk Integration

1. **Middleware Protection:** `src/middleware.ts` handles route protection
2. **Layout Provider:** `src/app/layout.tsx` wraps app with ClerkProvider
3. **User Management:** Built-in components for sign-in/sign-up
4. **Session Handling:** Automatic session management and token refresh

### Protected Routes

- Default: All routes are public
- Protected routes: `/application/*` require authentication
- Public routes: `/public/*` and root pages are accessible to all
- Customize in `middleware.ts` using `publicRoutes` and `ignoredRoutes`
- Add authentication checks in page components using `useAuth()` hook

## UI Component System

### Shadcn/ui Integration

- Components located in `src/components/ui/`
- Configured via `components.json` with New York style
- RSC (React Server Components) support enabled
- Add new components: `npx shadcn-ui@latest add [component-name]`
- Customizable via CSS variables in `src/styles/globals.css`
- Uses Lucide React for icons
- Path aliases configured for easy imports

### Tailwind CSS 4.0

- Latest Tailwind v4 with new architecture
- Configuration uses `@import` directives in CSS
- Custom theme variables defined inline
- Dark mode support with CSS custom properties
- Class merging with `tailwind-merge` utility
- Animation utilities via `tw-animate-css`
- PostCSS integration via `@tailwindcss/postcss`

## Testing Strategy

### Unit Testing (Jest)

- Test files: `__tests__/` directories throughout the project
- Configuration: `jest.config.js` with Next.js integration
- Environment: jsdom for React component testing
- Setup file: `jest.setup.js` for global test configuration
- Coverage: Comprehensive coverage reports in `coverage/` directory
- Coverage thresholds: 90% for branches, functions, lines, and statements
- Module name mapping for TypeScript path aliases
- Supports React Testing Library for component testing

### E2E Testing (Playwright)

- Test files: `e2e/` directory with `.spec.ts` files
- Configuration: `playwright.config.ts`
- Browsers: Chromium and Firefox (WebKit disabled for simplicity)
- Automated development server startup for testing
- Screenshot and video capture on test failures
- Trace collection for debugging failed tests
- HTML and JSON reporting

## Development Guidelines

### Code Standards

- **TypeScript:** Strict mode enabled with comprehensive path mapping
- **ESLint:** Flat config with Next.js rules + Prettier integration
- **Prettier:** Single quotes, no semicolons, consistent formatting
- **Imports:** Extensive path aliases (`@/`, `@components/`, `@lib/`, etc.)
- **Font:** Poppins font family with variable font loading
- **Theme:** CSS custom properties for light/dark mode support

### Git Workflow

- Main branch: `main`
- Feature branches: `feature/description`
- Commit messages: Conventional commits format
- Pre-commit hooks: Lint and format checks

### Performance Optimizations

- **Development:** Standard Next.js dev server (Turbopack support available)
- **Image Optimization:** Next.js Image component with automatic optimization
- **Font Optimization:** Google Fonts (Poppins) with variable font loading
- **Bundle Analysis:** Built-in Next.js analyzer available
- **Source Maps:** Enabled in production for debugging
- **Security Headers:** Comprehensive security headers including CSP
- **PWA Ready:** Manifest file and service worker support

## Common Development Tasks

### Adding New Pages

1. **Public Pages:** Create in `src/app/public/[route]/page.tsx`
2. **Protected Pages:** Create in `src/app/application/[route]/page.tsx`
3. **Root Pages:** Create in `src/app/[route]/page.tsx`
4. Add layout if needed: `src/app/[route]/layout.tsx`
5. Update middleware protection rules if needed
6. Add comprehensive tests in `__tests__/` directory
7. Consider mobile navigation updates for new routes

### Adding New Components

1. **UI Components:** Add to `src/components/ui/` (Shadcn/ui)
2. **Feature Components:** Add to `src/components/`
3. Follow existing naming conventions (kebab-case files, PascalCase components)
4. Add TypeScript interfaces for all props
5. Include comprehensive unit tests in `__tests__/` directories
6. Consider dark mode support in styling
7. Use theme-aware colors and CSS custom properties
8. Add proper accessibility attributes and ARIA labels

### Integrating New Dependencies

1. Install package: `npm install [package-name]`
2. Add type definitions if needed: `npm install -D @types/[package-name]`
3. Update relevant configuration files
4. Add to this documentation if significant

## New Features & Components

### Authentication System

- **AuthButtons Component** - Smart authentication buttons that show sign-in/sign-up when logged out
- **AuthRedirect Component** - Handles authentication redirects and state management
- **UserDropdown** - User menu with profile options and sign-out functionality

### Theme System

- **ThemeSwitch Component** - Animated light/dark mode toggle with smooth transitions
- **CSS Custom Properties** - Comprehensive theme variables for all UI elements
- **LocalStorage Persistence** - Theme preference saved across sessions
- **System Preference Detection** - Respects user's OS theme preference

### Page Structure

- **Homepage** - Modern landing page with gradient design and feature showcase
- **Dashboard** - Analytics dashboard with stats, charts, and recent activity
- **User Page** - User profile and account management
- **App Info** - Detailed application information and technology stack
- **Contact Us** - Contact form and company information

### Layout System

- **Root Layout** - Global navigation with theme toggle and authentication
- **Application Layout** - Protected area layout for authenticated users
- **Public Layout** - Layout for public pages without authentication
- **Mobile Navigation** - Bottom navigation bar for mobile devices

### Error Handling

- **Error Boundary** - React error boundary for graceful error handling
- **Loading Spinner** - Consistent loading states across the application
- **404 Handling** - Custom error pages for better user experience

### Security Features

- **Content Security Policy** - Strict CSP headers for XSS protection
- **Security Headers** - Comprehensive security headers in Next.js config
- **Route Protection** - Middleware-based authentication for protected routes
- **CSRF Protection** - Built-in protection against cross-site request forgery

## Deployment Considerations

### Build Process

1. Run `npm run build` to create production build
2. Static files generated in `.next/` directory
3. Optimize images and fonts automatically
4. Bundle analysis available via Next.js tools

### Environment Setup

- Copy `.env.example` to `.env.local` for development
- Set production environment variables on hosting platform
- Ensure Clerk keys match deployment environment
- Configure domain in Clerk dashboard

### Platform Compatibility

- **Vercel:** Native Next.js support (recommended)
- **Netlify:** Full Next.js support with plugins
- **AWS/GCP/Azure:** Container or serverless deployment
- **Docker:** Dockerfile can be added for containerization

## Troubleshooting

### Common Issues

1. **Clerk Authentication Errors:**

   - Verify API keys in `.env.local`
   - Check domain configuration in Clerk dashboard
   - Ensure middleware is properly configured

2. **Build Failures:**

   - Resolve all TypeScript strict mode errors
   - Check for missing dependencies
   - Verify all imports are correctly typed

3. **Test Failures:**

   - Check async/await patterns in tests
   - Verify mock implementations
   - Ensure test environment setup is correct

4. **Styling Issues:**

   - Verify Tailwind v4 configuration
   - Check CSS custom property definitions
   - Ensure dark mode classes are properly applied

5. **Theme Issues:**
   - Verify localStorage access in client components
   - Check CSS custom property inheritance
   - Ensure theme toggle is working correctly

### Debug Mode

- Enable Next.js debug mode: `DEBUG=* npm run dev`
- Enable Clerk debug mode: Set `CLERK_DEBUG=true` in environment
- Use React DevTools for component debugging
- Use browser developer tools for network/performance analysis

## AI Agent Instructions

### When Working with This Codebase

1. **Environment Setup** - Ensure `.env.local` exists with proper Clerk keys
2. **TypeScript Compliance** - Follow strict mode, use path aliases, proper typing
3. **Component Patterns** - Check existing components for styling and structure patterns
4. **Testing Requirements** - Achieve 90% coverage threshold, test both unit and integration
5. **Authentication Flow** - Test all auth states and protected route access
6. **Theme Support** - Ensure new components support both light and dark modes
7. **Mobile Responsiveness** - Test on various screen sizes and update mobile nav if needed
8. **Code Quality** - Run lint, format, and all tests before commits
9. **Security Headers** - Understand CSP and security configuration in next.config.ts
10. **Documentation** - Update this guide when adding significant architectural changes

### Recommended Development Flow

1. **Analysis** - Understand requirements and check existing similar implementations
2. **Planning** - Identify affected files, routes, and components
3. **Implementation** - Make incremental changes with frequent testing
4. **Theme Testing** - Verify functionality in both light and dark modes
5. **Responsive Testing** - Check mobile, tablet, and desktop layouts
6. **Authentication Testing** - Test both signed-in and signed-out states
7. **Quality Assurance** - Ensure all tests pass and meet coverage thresholds
8. **Documentation** - Update comments, tests, and this guide as needed
9. **E2E Verification** - Test complete user flows end-to-end
10. **Performance Check** - Verify no performance regressions

---

_This guide is maintained for AI agents working with the nextjs-clerk-template codebase. Keep it updated when making significant architectural changes._
