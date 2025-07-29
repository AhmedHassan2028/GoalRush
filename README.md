# 🚀 Next.js 15 + Clerk Template

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Clerk-6.22.0-purple?style=for-the-badge&logo=clerk)](https://clerk.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-Latest-black?style=for-the-badge)](https://ui.shadcn.com/)
[![Tests](https://img.shields.io/badge/Tests-534_Unit_+_38_E2E-green?style=for-the-badge&logo=jest)](docs/testing.md)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen?style=for-the-badge&logo=codecov)](coverage/index.html)

**A modern, production-ready Next.js template with authentication, beautiful UI components, and comprehensive testing.**

🚀 **[Live Demo](https://nextjs-template.demo.vedaterenoglu.com)** 🚀

</div>

---

## ✨ Features

### 🔐 **Authentication & Security**

- **Clerk Integration** - Complete authentication solution with social logins
- **Middleware Protection** - Route-level authentication guards for protected areas
- **User Management** - Built-in user profiles and session handling
- **Security Headers** - Comprehensive CSP and security headers

### 🎨 **Modern UI/UX**

- **Shadcn/ui Components** - Beautiful, accessible component library with New York style
- **Tailwind CSS 4.0** - Latest utility-first CSS framework with new architecture
- **Dark/Light Mode** - System-aware theme toggle with smooth animations
- **Responsive Design** - Mobile-first approach with dedicated mobile navigation
- **Lucide Icons** - Comprehensive icon library with 500+ icons

### 🛠️ **Developer Experience**

- **TypeScript** - Full type safety with strict mode and comprehensive path aliases
- **ESLint + Prettier** - Modern flat config with automatic code formatting
- **Next.js 15** - Latest React framework with App Router and React 19
- **Hot Reload** - Instant development feedback with fast refresh

### 🧪 **Testing & Quality**

- **Jest** - Unit and integration testing with 90%+ coverage requirement
- **Playwright** - End-to-end testing across Chromium and Firefox
- **Testing Library** - React component testing with user-centric queries
- **Coverage Reports** - Comprehensive HTML and JSON coverage reports

---

## 🏗️ **Tech Stack**

| Category           | Technology        | Version | Purpose                         |
| ------------------ | ----------------- | ------- | ------------------------------- |
| **Framework**      | Next.js           | 15.3.4  | Full-stack React framework      |
| **Runtime**        | React             | 19.0.0  | UI library with latest features |
| **Language**       | TypeScript        | 5.0+    | Type-safe JavaScript            |
| **Authentication** | Clerk             | 6.22.0  | Complete auth solution          |
| **Styling**        | Tailwind CSS      | 4.0     | Utility-first CSS               |
| **Components**     | Shadcn/ui         | Latest  | Pre-built UI components         |
| **Icons**          | Lucide React      | 0.518.0 | Beautiful icon library          |
| **Testing**        | Jest + Playwright | Latest  | Unit & E2E testing              |
| **Linting**        | ESLint + Prettier | Latest  | Code quality tools              |

---

## 🚀 **Quick Start**

### Prerequisites

- **Node.js** 18.17+ (LTS recommended)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Clerk Account** for authentication ([Sign up free](https://clerk.dev/))

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/vedaterenoglu/nextjs-clerk-template.git
cd nextjs-clerk-template

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

> ⚠️ **Important**: You must configure your environment variables before running the application.

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=YourAwesomeApp    # 👈 Replace with your actual app name

# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

**🔑 Getting Clerk Keys:**

1. Visit [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Create a new application or select existing
3. Go to "API Keys" section
4. Copy your publishable and secret keys

### 3. Run Development Server

```bash
npm run dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000)** to see your app in action!

---

## 🏛️ **Project Architecture**

### 📁 **Directory Structure**

```
nextjs-clerk-template/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx             # Root layout with Clerk provider
│   │   ├── page.tsx               # Modern homepage with gradients
│   │   ├── user-dropdown.tsx      # User authentication dropdown
│   │   ├── application/           # 🔒 Protected routes
│   │   │   ├── dashboard/         # Analytics dashboard
│   │   │   └── user-page/         # User profile management
│   │   └── public/                # 🌐 Public routes
│   │       ├── app-info/          # Application information
│   │       └── contact-us/        # Contact information
│   ├── components/                # Reusable UI components
│   │   ├── auth-buttons.tsx       # Smart auth buttons
│   │   ├── auth-redirect.tsx      # Auth redirect handler
│   │   ├── error-boundary.tsx     # Error boundary wrapper
│   │   ├── loading-spinner.tsx    # Loading states
│   │   ├── theme-switch.tsx       # Dark/light mode toggle
│   │   └── ui/                    # Shadcn/ui components
│   ├── lib/                       # Utilities and configurations
│   ├── styles/                    # Global styles and themes
│   └── __tests__/                 # Test files and helpers
├── e2e/                           # Playwright E2E tests
├── coverage/                      # Test coverage reports
└── public/                        # Static assets and manifest
```

### 🔐 **Route Protection**

- **Public Routes**: `/`, `/public/*` - Accessible to all users
- **Protected Routes**: `/application/*` - Requires authentication
- **Middleware**: Automatic route protection via `src/middleware.ts`

---

## 🧪 **Testing & Quality Assurance**

### 📊 **Test Coverage Overview**

| Metric         | Coverage | Files Tested    | Threshold |
| -------------- | -------- | --------------- | --------- |
| **Lines**      | **100%** | All Components  | 90%       |
| **Functions**  | **100%** | All Functions   | 90%       |
| **Branches**   | **100%** | All Logic Paths | 90%       |
| **Statements** | **100%** | All Code        | 90%       |

### 🔬 **Unit & Integration Tests**

**Test Statistics:**

- **Total Test Files**: 25 unit test files
- **Total Unit Tests**: 534 individual test cases
- **Test Directories**: 11 `__tests__/` directories
- **Coverage Threshold**: 90% minimum across all metrics (exceeded at 100%)
- **Test Framework**: Jest with React Testing Library
- **Test Runtime**: 3.929 seconds

**Test Coverage by Component:**

| Component               | Lines | Functions | Branches | Statements |
| ----------------------- | ----- | --------- | -------- | ---------- |
| **auth-buttons.tsx**    | 100%  | 100%      | 100%     | 100%       |
| **theme-switch.tsx**    | 100%  | 100%      | 100%     | 100%       |
| **error-boundary.tsx**  | 100%  | 100%      | 100%     | 100%       |
| **loading-spinner.tsx** | 100%  | 100%      | 100%     | 100%       |
| **Layout Components**   | 100%  | 100%      | 100%     | 100%       |
| **Page Components**     | 100%  | 100%      | 100%     | 100%       |
| **Middleware**          | 100%  | 100%      | 100%     | 100%       |
| **Utilities**           | 100%  | 100%      | 100%     | 100%       |

**Key Testing Features:**

- ✅ **Component Testing** - All UI components thoroughly tested
- ✅ **Integration Testing** - App-level integration tests
- ✅ **Accessibility Testing** - ARIA and semantic structure validation
- ✅ **Theme Testing** - Dark/light mode compatibility
- ✅ **Responsive Testing** - Mobile, tablet, desktop layouts
- ✅ **Error Handling** - Error boundary and fallback testing

### 🎭 **End-to-End Tests**

**E2E Test Statistics:**

- **Total E2E Tests**: 19 comprehensive test scenarios (38 cross-browser executions)
- **Test Duration**: ~23.3 seconds average runtime
- **Browsers Tested**: Chromium & Firefox (parallel execution)
- **Success Rate**: 100% (38/38 tests passed)
- **Test Categories**: 9 distinct test groups

**Test Coverage Areas:**

| Test Category           | Tests   | Status      | Description                                   |
| ----------------------- | ------- | ----------- | --------------------------------------------- |
| **Home Page**           | 4 tests | ✅ All Pass | Page load, navigation, auth buttons, app name |
| **Navigation**          | 2 tests | ✅ All Pass | Logo navigation, styling validation           |
| **External Links**      | 1 test  | ✅ All Pass | Link attributes and accessibility             |
| **Authentication Flow** | 2 tests | ✅ All Pass | Theme toggle, navigation layout               |
| **Responsive Design**   | 2 tests | ✅ All Pass | Mobile and tablet responsiveness              |
| **Performance**         | 2 tests | ✅ All Pass | Load time and Core Web Vitals                 |
| **Accessibility**       | 3 tests | ✅ All Pass | Keyboard nav, semantics, alt texts            |
| **Error Handling**      | 2 tests | ✅ All Pass | 404 handling, JS error recovery               |
| **Cross-Browser**       | 1 test  | ✅ All Pass | Browser compatibility validation              |

**Detailed Test Breakdown:**

- **Home Page Tests**: Page loading, navigation display, authentication UI, app branding
- **Navigation Tests**: Logo functionality, visual styling consistency
- **Link Tests**: External link attributes, proper href values
- **Theme Tests**: Dark/light mode toggle functionality, layout integrity
- **Responsive Tests**: Mobile (390px), tablet (768px) viewport testing
- **Performance Tests**: Sub-3-second load times, Core Web Vitals compliance
- **Accessibility Tests**: Keyboard navigation, semantic HTML, image alt attributes
- **Error Tests**: 404 page handling, JavaScript error boundaries
- **Browser Tests**: Cross-browser compatibility (Chromium vs Firefox)

**Performance Metrics:**

- ⚡ **Average Load Time**: 2.2-3.1 seconds (well under 3s target)
- 🎯 **Core Web Vitals**: All tests passing (LCP, FID, CLS compliant)
- 📱 **Mobile Performance**: Tested on 390px and 768px viewports
- 🔄 **Cross-Browser**: Consistent performance across Chromium & Firefox
- 🚀 **Test Execution**: 6 parallel workers for optimal speed
- 📊 **Error Rate**: 0% (no failed tests)

---

## 📦 **Package Details**

### 🎯 **Core Dependencies**

| Package                    | Version  | Description                                |
| -------------------------- | -------- | ------------------------------------------ |
| `@clerk/nextjs`            | ^6.22.0  | Complete authentication solution           |
| `@radix-ui/react-slot`     | ^1.2.3   | Primitive for building flexible components |
| `class-variance-authority` | ^0.7.1   | Type-safe variant management               |
| `clsx`                     | ^2.1.1   | Conditional className utility              |
| `lucide-react`             | ^0.518.0 | Beautiful & consistent icon library        |
| `tailwind-merge`           | ^3.3.1   | Smart Tailwind class merging               |

### 🛠️ **Development Dependencies**

| Package                | Purpose      | Description                       |
| ---------------------- | ------------ | --------------------------------- |
| `@eslint/eslintrc`     | Linting      | ESLint flat configuration         |
| `@tailwindcss/postcss` | Styling      | PostCSS plugin for Tailwind v4    |
| `@playwright/test`     | E2E Testing  | Browser automation testing        |
| `@testing-library/*`   | Unit Testing | React component testing utilities |
| `jest`                 | Unit Testing | JavaScript testing framework      |
| `prettier`             | Formatting   | Code formatting tool              |
| `typescript`           | Language     | Type-safe JavaScript              |

---

## 🔧 **Scripts Reference**

### 🚀 **Development**

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
```

### 🎨 **Code Quality**

```bash
npm run lint         # Run ESLint checks
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check if code is properly formatted
```

### 🧪 **Testing**

```bash
npm run test              # Run unit tests with Jest
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate test coverage report
npm run test:e2e          # Run end-to-end tests
npm run test:e2e:ui       # Run E2E tests with UI
npm run test:e2e:headed   # Run E2E tests in headed mode
npm run test:all          # Run all tests (unit + E2E)
```

### 📋 **Script Details**

| Script            | Command                    | Description                                      |
| ----------------- | -------------------------- | ------------------------------------------------ |
| `dev`             | `next dev`                 | Starts development server with fast refresh      |
| `build`           | `next build`               | Creates optimized production build               |
| `start`           | `next start`               | Starts production server (requires build first)  |
| `lint`            | `next lint`                | Runs ESLint to check code quality                |
| `lint:fix`        | `next lint --fix`          | Automatically fixes ESLint issues                |
| `format`          | `prettier --write .`       | Formats all files with Prettier                  |
| `format:check`    | `prettier --check .`       | Checks if files are properly formatted           |
| `test`            | `jest`                     | Runs unit tests with Jest                        |
| `test:watch`      | `jest --watch`             | Runs tests in watch mode for development         |
| `test:coverage`   | `jest --coverage`          | Generates detailed test coverage report          |
| `test:e2e`        | `playwright test`          | Runs end-to-end tests in headless mode           |
| `test:e2e:ui`     | `playwright test --ui`     | Opens Playwright UI for interactive testing      |
| `test:e2e:headed` | `playwright test --headed` | Runs E2E tests with visible browser              |
| `test:all`        | Combined command           | Runs both unit tests with coverage and E2E tests |

---

## 🎨 **UI Components & Styling**

### 🧩 **Component Library**

**Shadcn/ui Integration:**

- 🎭 **Style**: New York design system
- 🔧 **Configuration**: `components.json` with RSC support
- 📦 **Installation**: `npx shadcn-ui@latest add [component]`
- 🎨 **Customization**: CSS custom properties in `globals.css`

**Available Components:**

- ✅ **Button** - Variant-based button component
- ✅ **Theme Switch** - Animated dark/light mode toggle
- 🔄 **Loading Spinner** - Consistent loading states
- 🚨 **Error Boundary** - Graceful error handling
- 🔐 **Auth Components** - Smart authentication UI

### 🎨 **Theming System**

**Dark/Light Mode Features:**

- 🌓 **Auto Detection** - Respects system preferences
- 💾 **Persistence** - Saves theme choice in localStorage
- ⚡ **Smooth Transitions** - Animated theme switching
- 🎯 **CSS Custom Properties** - Consistent color system

**Tailwind CSS 4.0:**

- 📦 **New Architecture** - CSS-first configuration
- 🎨 **Inline Themes** - Custom properties defined in CSS
- 🔧 **PostCSS Integration** - Modern build pipeline
- ⚡ **Performance** - Optimized for production

---

## 🚁 **Getting Started Checklist**

- [ ] **Clone the repository**
- [ ] **Install dependencies** (`npm install`)
- [ ] **Set up Clerk account** ([clerk.dev](https://clerk.dev/))
- [ ] **Configure environment variables** (copy `.env.example` to `.env.local`)
- [ ] **Add your app name** to `NEXT_PUBLIC_APP_NAME` in environment file
- [ ] **Add Clerk API keys** to environment file
- [ ] **Run development server** (`npm run dev`)
- [ ] **Open http://localhost:3000** in browser
- [ ] **Test authentication** (sign up/sign in)
- [ ] **Run tests** (`npm run test:all`)
- [ ] **Start building** your amazing app! 🚀

---

## 🛡️ **Security Features**

### 🔐 **Built-in Security**

- **Content Security Policy** - Strict CSP headers for XSS protection
- **Security Headers** - HSTS, X-Frame-Options, X-Content-Type-Options
- **CSRF Protection** - Built-in cross-site request forgery protection
- **Route Protection** - Middleware-based authentication guards
- **Input Validation** - TypeScript strict mode and runtime validation

### 🏛️ **Architecture Security**

- **Environment Variables** - Secure configuration management
- **API Key Separation** - Client/server key isolation
- **Session Management** - Automatic token refresh and validation
- **Error Boundaries** - Graceful error handling without information disclosure

---

## 🚀 **Deployment**

### 📋 **Pre-deployment Checklist**

- [ ] **Tests Passing** - Run `npm run test:all` successfully
- [ ] **Build Success** - Run `npm run build` without errors
- [ ] **Environment Variables** - Configure production env vars
- [ ] **Clerk Domain** - Update domain in Clerk dashboard
- [ ] **Security Headers** - Verify CSP and security configuration

### 🌐 **Deployment Platforms**

| Platform          | Support      | Notes                                |
| ----------------- | ------------ | ------------------------------------ |
| **Vercel**        | ✅ Native    | Recommended - Zero config deployment |
| **Netlify**       | ✅ Full      | Complete Next.js support             |
| **AWS/GCP/Azure** | ✅ Container | Serverless or container deployment   |
| **Docker**        | ✅ Ready     | Dockerfile can be added              |

---

## 👨‍💻 **Author**

<div align="center">

**Vedat Erenoglu**  
_Full Stack Developer & Software Architect_

[![Website](https://img.shields.io/badge/Website-https://vedaterenoglu.com-blue?style=flat-square&logo=globe)](https://vedaterenoglu.com)
[![Email](https://img.shields.io/badge/Email-info@vedaterenoglu.com-red?style=flat-square&logo=gmail)](mailto:info@vedaterenoglu.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vedaterenoglu-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/vedaterenoglu/)
[![GitHub](https://img.shields.io/badge/GitHub-vedaterenoglu-black?style=flat-square&logo=github)](https://github.com/vedaterenoglu)

_Passionate about creating modern, scalable web applications with exceptional user experiences._

</div>

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ by [Vedat Erenoglu](https://vedaterenoglu.com)

</div>
