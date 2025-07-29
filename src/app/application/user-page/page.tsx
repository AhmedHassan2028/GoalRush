import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Settings,
  Edit,
  Camera,
  Award,
  Clock,
  TrendingUp,
} from 'lucide-react'

export default function UserAccount() {
  const userInfo = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    avatar: '/api/placeholder/100/100',
    role: 'Premium Member',
    verified: true,
  }

  const accountStats = [
    {
      label: 'Profile Views',
      value: '2,847',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      label: 'Total Orders',
      value: '34',
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      label: 'Loyalty Points',
      value: '1,256',
      icon: Award,
      color: 'text-purple-600',
    },
    {
      label: 'Account Age',
      value: '1.5 years',
      icon: Clock,
      color: 'text-orange-600',
    },
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      item: 'Premium Subscription',
      date: '2024-01-15',
      status: 'Active',
      amount: '$29.99',
    },
    {
      id: 'ORD-002',
      item: 'Mobile App Pro',
      date: '2024-01-10',
      status: 'Completed',
      amount: '$19.99',
    },
    {
      id: 'ORD-003',
      item: 'Cloud Storage 1TB',
      date: '2024-01-05',
      status: 'Active',
      amount: '$9.99',
    },
    {
      id: 'ORD-004',
      item: 'API Access Plan',
      date: '2023-12-28',
      status: 'Expired',
      amount: '$49.99',
    },
  ]

  const preferences = [
    {
      category: 'Notifications',
      setting: 'Email notifications enabled',
      enabled: true,
    },
    {
      category: 'Privacy',
      setting: 'Profile visibility: Public',
      enabled: true,
    },
    {
      category: 'Security',
      setting: 'Two-factor authentication',
      enabled: true,
    },
    { category: 'Marketing', setting: 'Promotional emails', enabled: false },
  ]

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
            User Profile
          </h1>
          <p className='text-muted-foreground mt-1'>
            Manage your account settings and preferences
          </p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'>
          <Edit className='h-4 w-4' />
          Edit Profile
        </button>
      </div>

      {/* User Info Card */}
      <div className='bg-card rounded-xl p-6 border shadow-sm'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
          <div className='relative'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold'>
              AJ
            </div>
            <button className='absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors'>
              <Camera className='h-4 w-4' />
            </button>
          </div>

          <div className='flex-1 space-y-3'>
            <div className='flex items-center gap-3'>
              <h2 className='text-2xl font-bold'>{userInfo.name}</h2>
              {userInfo.verified && (
                <div className='flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs font-medium'>
                  <Shield className='h-3 w-3' />
                  Verified
                </div>
              )}
              <span className='px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm font-medium'>
                {userInfo.role}
              </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Mail className='h-4 w-4' />
                {userInfo.email}
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Phone className='h-4 w-4' />
                {userInfo.phone}
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MapPin className='h-4 w-4' />
                {userInfo.location}
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                Member since {userInfo.joinDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {accountStats.map((stat, index) => (
          <div
            key={index}
            className='bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-between'>
              <div
                className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100 dark:bg-')}-900/30`}
              >
                <stat.icon
                  className={`h-5 w-5 ${stat.color} dark:${stat.color.replace('-600', '-400')}`}
                />
              </div>
            </div>
            <div className='mt-4'>
              <h3 className='text-2xl font-bold'>{stat.value}</h3>
              <p className='text-muted-foreground text-sm mt-1'>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Recent Orders */}
        <div className='bg-card rounded-xl p-6 border shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-semibold'>Recent Orders</h3>
              <p className='text-muted-foreground text-sm'>
                Your latest purchases and subscriptions
              </p>
            </div>
            <button className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium'>
              View All
            </button>
          </div>
          <div className='space-y-4'>
            {recentOrders.map(order => (
              <div
                key={order.id}
                className='flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors'
              >
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-1'>
                    <span className='font-medium'>{order.item}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Active'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : order.status === 'Completed'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {order.id} • {order.date}
                  </p>
                </div>
                <span className='font-semibold'>{order.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Account Preferences */}
        <div className='bg-card rounded-xl p-6 border shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-semibold'>Account Preferences</h3>
              <p className='text-muted-foreground text-sm'>
                Manage your account settings
              </p>
            </div>
            <button className='p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors'>
              <Settings className='h-4 w-4' />
            </button>
          </div>
          <div className='space-y-4'>
            {preferences.map((pref, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-muted/20 rounded-lg'
              >
                <div>
                  <p className='font-medium'>{pref.category}</p>
                  <p className='text-sm text-muted-foreground'>
                    {pref.setting}
                  </p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    pref.enabled
                      ? 'bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  } relative`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    } absolute top-0.5`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
