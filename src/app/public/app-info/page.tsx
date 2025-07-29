import React from 'react'
import {
  Shield,
  Zap,
  Users,
  Globe,
  Smartphone,
  Cloud,
  Headphones,
} from 'lucide-react'

export default function AppInfo() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description:
        'Enterprise-grade security with multi-factor authentication and data encryption.',
      color: 'text-emerald-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Optimized performance with sub-second load times and responsive design.',
      color: 'text-yellow-600',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Built-in tools for seamless team collaboration and project management.',
      color: 'text-blue-600',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description:
        'Access your data from anywhere in the world with 99.9% uptime guarantee.',
      color: 'text-purple-600',
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description:
        'Fully responsive design that works perfectly on all devices and screen sizes.',
      color: 'text-pink-600',
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description:
        'Seamless integration with popular cloud services and storage providers.',
      color: 'text-cyan-600',
    },
  ]

  const stats = [
    { number: '100K+', label: 'Active Users', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '24/7', label: 'Support', icon: Headphones },
    { number: '50+', label: 'Countries', icon: Globe },
  ]

  const technologies = [
    { name: 'Next.js', description: 'React framework for production' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Clerk', description: 'Authentication & user management' },
    { name: 'Vercel', description: 'Deployment platform' },
    { name: 'Prisma', description: 'Database toolkit' },
  ]

  return (
    <div className='space-y-12'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4'>
          Welcome to Our Platform
        </h1>
        <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
          A modern, secure, and scalable application built with the latest
          technologies. Experience the future of web applications with our
          cutting-edge platform.
        </p>
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div key={index} className='text-center'>
            <div className='inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mb-3'>
              <stat.icon className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
            </div>
            <div className='text-3xl font-bold text-emerald-600 dark:text-emerald-400'>
              {stat.number}
            </div>
            <div className='text-sm text-muted-foreground'>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className='text-3xl font-bold text-center mb-12'>
          <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
            Key Features
          </span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color
                  .replace('text-', 'bg-')
                  .replace('-600', '-100 dark:bg-')
                  .replace('-600', '-900/30')}`}
              >
                <feature.icon
                  className={`h-6 w-6 ${feature.color} dark:${feature.color.replace('-600', '-400')}`}
                />
              </div>
              <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
              <p className='text-muted-foreground'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div>
        <h2 className='text-3xl font-bold text-center mb-12'>
          <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
            Built With Modern Tech
          </span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {technologies.map((tech, index) => (
            <div
              key={index}
              className='flex items-center p-4 bg-card rounded-lg border hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors'
            >
              <div className='w-3 h-3 bg-emerald-500 rounded-full mr-4'></div>
              <div>
                <h4 className='font-semibold'>{tech.name}</h4>
                <p className='text-sm text-muted-foreground'>
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className='text-center bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/50'>
        <h2 className='text-2xl font-bold mb-4'>Ready to Get Started?</h2>
        <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
          Join thousands of users who trust our platform for their daily
          workflows. Sign up today and experience the difference.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors'>
            Start Free Trial
          </button>
          <button className='px-8 py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg font-semibold transition-colors'>
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
