'use client'

import Link from 'next/link'
import {
  Home,
  LayoutDashboard,
  User,
  Sparkles,
  Info,
  MessageCircle,
} from 'lucide-react'
import ThemeSwitch from '@/components/theme-switch'
import { useUser } from '@clerk/nextjs'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser()
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900'>
      {/* Animated background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-300/10 to-violet-300/10 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      {/* Top Navigation */}
      <nav className='relative z-10 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo and Title */}
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg'>
                <Sparkles className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                  Protected Area
                </h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className='hidden md:flex items-center space-x-1'>
              <Link
                href='/'
                className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 group'
              >
                <Home className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
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
                <Info className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
                App Info
              </Link>
              <Link
                href='/public/contact-us'
                className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 group'
              >
                <MessageCircle className='h-4 w-4 mr-2 group-hover:scale-110 transition-transform' />
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
          <div className='bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 px-6 py-4 border-b border-white/20 dark:border-slate-700/50'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-muted-foreground'>
                  Authenticated Session
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-1 h-1 bg-blue-500 rounded-full animate-pulse'></div>
                <div className='w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-300'></div>
                <div className='w-1 h-1 bg-pink-500 rounded-full animate-pulse delay-700'></div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className='p-6'>{children}</div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border-t border-white/20 dark:border-slate-700/50 shadow-lg'>
        <div className='flex items-center justify-around py-2'>
          <Link
            href='/'
            className='flex flex-col items-center px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            <Home className='h-5 w-5 mb-1' />
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
            <Info className='h-5 w-5 mb-1' />
            App Info
          </Link>
          <Link
            href='/public/contact-us'
            className='flex flex-col items-center px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            <MessageCircle className='h-5 w-5 mb-1' />
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
