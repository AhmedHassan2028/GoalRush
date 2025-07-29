import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Users,
} from 'lucide-react'

const ContactUs = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@platform.com',
      action: 'Send Email',
      color: 'text-emerald-600',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Talk to our support team directly',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'text-blue-600',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
      color: 'text-purple-600',
    },
    {
      icon: Headphones,
      title: 'Help Center',
      description: 'Browse our knowledge base',
      contact: '500+ articles and guides',
      action: 'Browse FAQ',
      color: 'text-orange-600',
    },
  ]

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, SF, CA 94105',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9 AM - 6 PM PST',
    },
    {
      city: 'New York',
      address: '456 Business Ave, NYC, NY 10001',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9 AM - 6 PM EST',
    },
    {
      city: 'London',
      address: '789 Innovation Lane, London, UK',
      phone: '+44 20 7123 4567',
      hours: 'Mon-Fri: 9 AM - 5 PM GMT',
    },
  ]

  const supportStats = [
    { icon: Users, label: 'Support Agents', value: '50+' },
    { icon: Clock, label: 'Avg Response Time', value: '< 2hrs' },
    { icon: MessageSquare, label: 'Tickets Resolved', value: '10K+' },
    { icon: Phone, label: 'Customer Satisfaction', value: '98%' },
  ]

  return (
    <div className='space-y-12'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4'>
          Get in Touch
        </h1>
        <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
          Have questions or need support? Our team is here to help you succeed.
          Choose the best way to reach us below.
        </p>
      </div>

      {/* Support Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {supportStats.map((stat, index) => (
          <div key={index} className='text-center'>
            <div className='inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mb-3'>
              <stat.icon className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
            </div>
            <div className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
              {stat.value}
            </div>
            <div className='text-sm text-muted-foreground'>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Contact Methods */}
      <div>
        <h2 className='text-3xl font-bold text-center mb-12'>
          <span className='bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
            How Can We Help?
          </span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className='bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${method.color
                  .replace('text-', 'bg-')
                  .replace('-600', '-100 dark:bg-')
                  .replace('-600', '-900/30')}`}
              >
                <method.icon
                  className={`h-6 w-6 ${method.color} dark:${method.color.replace('-600', '-400')}`}
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>{method.title}</h3>
              <p className='text-muted-foreground mb-3'>{method.description}</p>
              <p className='font-medium mb-4'>{method.contact}</p>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  method.color === 'text-emerald-600'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : method.color === 'text-blue-600'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : method.color === 'text-purple-600'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
              >
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        {/* Contact Form */}
        <div className='bg-card rounded-xl p-8 border shadow-sm'>
          <h3 className='text-2xl font-bold mb-6'>Send us a Message</h3>
          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  First Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background'
                  placeholder='John'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background'
                  placeholder='Doe'
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                type='email'
                className='w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background'
                placeholder='john@example.com'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Subject</label>
              <select className='w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background'>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Message</label>
              <textarea
                rows={5}
                className='w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background resize-none'
                placeholder='Tell us how we can help you...'
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
            >
              <Send className='h-4 w-4' />
              Send Message
            </button>
          </form>
        </div>

        {/* Office Locations */}
        <div className='space-y-6'>
          <h3 className='text-2xl font-bold'>Our Offices</h3>
          {officeLocations.map((office, index) => (
            <div
              key={index}
              className='bg-card rounded-xl p-6 border shadow-sm'
            >
              <h4 className='text-lg font-semibold mb-3 text-emerald-600 dark:text-emerald-400'>
                {office.city}
              </h4>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <MapPin className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <span className='text-sm'>{office.address}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm'>{office.phone}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Clock className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm'>{office.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Preview */}
      <div className='text-center bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/50'>
        <h2 className='text-2xl font-bold mb-4'>Looking for Quick Answers?</h2>
        <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
          Check out our comprehensive FAQ section and help center for instant
          solutions to common questions and detailed guides.
        </p>
        <button className='px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors'>
          Visit Help Center
        </button>
      </div>
    </div>
  )
}

export default ContactUs
