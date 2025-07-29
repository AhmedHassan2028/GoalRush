'use client'

import { useUser } from '@clerk/nextjs'
import {
  Rocket,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  LayoutDashboard,
  User,
} from 'lucide-react'
import Link from 'next/link'
import ThemeSwitch from '@/components/theme-switch'

export default function Home() {
  const { isLoaded, isSignedIn } = useUser()

  const features = [
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with authentication built-in',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with Next.js 15 and modern tooling',
    },
    {
      icon: Users,
      title: 'Team Ready',
      description: 'Built for collaboration with role-based access control',
    },
  ]

  const benefits = [
    'Modern React with Next.js 15',
    'Authentication with Clerk',
    'Beautiful UI with Tailwind CSS',
    'Type-safe with TypeScript',
    'Dark mode support',
    'Mobile responsive design',
  ]

  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-cyan-900 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-cyan-900'>
      {/* Animated background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-300/10 to-emerald-300/10 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      {/* Top Navigation */}
      <nav className='relative z-10 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo and Title */}
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg'>
                <Rocket className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
                  Next-Gen Platform
                </h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className='hidden md:flex items-center space-x-1'>
              <Link
                href='/'
                className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-foreground bg-white/50 dark:bg-slate-700/50'
              >
                <Rocket className='h-4 w-4 mr-2' />
                Home
              </Link>
              {isSignedIn && (
                <>
                  <Link
                    href='/application/dashboard'
                    className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 group'
                  >
                    <LayoutDashboard className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
                    Dashboard
                  </Link>
                  <Link
                    href='/application/user-page'
                    className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 group'
                  >
                    <User className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
                    Profile
                  </Link>
                </>
              )}
              <Link
                href='/public/app-info'
                className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 group'
              >
                <Shield className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
                App Info
              </Link>
              <Link
                href='/public/contact-us'
                className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 group'
              >
                <Users className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
                Contact
              </Link>
              <div className='ml-4 pl-4 border-l border-white/20 dark:border-slate-700/50'>
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl overflow-hidden'>
          {/* Content Header */}
          <div className='bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 px-6 py-4 border-b border-white/20 dark:border-slate-700/50'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-muted-foreground'>
                  Welcome Home
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-1 h-1 bg-emerald-500 rounded-full animate-pulse'></div>
                <div className='w-1 h-1 bg-teal-500 rounded-full animate-pulse delay-300'></div>
                <div className='w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-700'></div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className='p-6'>
            <div className='space-y-20'>
              {/* Hero Section */}
              <div className='text-center space-y-8'>
                <div className='space-y-4'>
                  <div className='inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium'>
                    <Star className='h-4 w-4 mr-2' />
                    Welcome to the Future
                  </div>
                  <h1 className='text-3xl md:text-5xl font-bold tracking-tight'>
                    <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
                      Next-Gen
                    </span>
                    <br />
                    <span className='text-foreground'>Platform</span>
                  </h1>
                  <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                    Experience the perfect blend of modern technology, beautiful
                    design, and powerful features. Built for developers,
                    designed for users.
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                  <Link
                    href='/public/app-info'
                    className='inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'
                  >
                    <Rocket className='h-5 w-5 mr-2' />
                    Get Started
                    <ArrowRight className='h-5 w-5 ml-2' />
                  </Link>
                  <Link
                    href='/public/contact-us'
                    className='inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105'
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Features Section */}
              <div className='space-y-12'>
                <div className='text-center'>
                  <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                    <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
                      Why Choose Us?
                    </span>
                  </h2>
                  <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                    Everything you need to build modern applications, right out
                    of the box.
                  </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className='bg-card rounded-2xl p-8 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2'
                    >
                      <div className='inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mb-6'>
                        <feature.icon className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
                      </div>
                      <h3 className='text-lg font-semibold mb-3'>
                        {feature.title}
                      </h3>
                      <p className='text-muted-foreground leading-relaxed'>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className='bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-3xl p-12 border border-emerald-200/50 dark:border-emerald-800/50'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                  <div className='space-y-6'>
                    <h2 className='text-2xl md:text-3xl font-bold'>
                      <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
                        Built with Modern Tech
                      </span>
                    </h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                      Our platform leverages the latest technologies to deliver
                      exceptional performance, security, and developer
                      experience.
                    </p>
                    <Link
                      href='/public/app-info'
                      className='inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold transition-colors'
                    >
                      Learn more about our tech stack
                      <ArrowRight className='h-4 w-4 ml-2' />
                    </Link>
                  </div>
                  <div className='space-y-4'>
                    {benefits.map((benefit, index) => (
                      <div key={index} className='flex items-center gap-3'>
                        <CheckCircle className='h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0' />
                        <span className='text-foreground font-medium'>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className='text-center space-y-8 py-12'>
                <h2 className='text-2xl md:text-3xl font-bold'>
                  Ready to{' '}
                  <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
                    Get Started?
                  </span>
                </h2>
                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                  Join thousands of developers and teams who trust our platform
                  for their projects.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link
                    href='/public/app-info'
                    className='inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg'
                  >
                    Start Your Journey
                    <ArrowRight className='h-5 w-5 ml-2' />
                  </Link>
                  <Link
                    href='/public/contact-us'
                    className='inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl font-semibold text-lg transition-all duration-200'
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border-t border-white/20 dark:border-slate-700/50 shadow-lg'>
        <div className='flex items-center justify-around py-2'>
          <Link
            href='/'
            className='flex flex-col items-center px-3 py-2 text-xs font-medium text-foreground'
          >
            <Rocket className='h-5 w-5 mb-1' />
            Home
          </Link>
          {isSignedIn && (
            <>
              <Link
                href='/application/dashboard'
                className='flex flex-col items-center px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                <LayoutDashboard className='h-5 w-5 mb-1' />
                Dashboard
              </Link>
              <Link
                href='/application/user-page'
                className='flex flex-col items-center px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                <User className='h-5 w-5 mb-1' />
                Profile
              </Link>
            </>
          )}
          <Link
            href='/public/app-info'
            className='flex flex-col items-center px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            <Shield className='h-5 w-5 mb-1' />
            App Info
          </Link>
          <Link
            href='/public/contact-us'
            className='flex flex-col items-center px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            <Users className='h-5 w-5 mb-1' />
            Contact
          </Link>
          <div className='flex flex-col items-center px-3 py-2'>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  )
}
