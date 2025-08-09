'use client'

import { deleteGoal, getGoals } from '@/lib/services/goalServices'
import { Goal } from '@/types'
import { useUser } from '@clerk/nextjs'
// import GoalForm from '@/components/ui/goalForm'
import {
  // TrendingUp,
  // Users,
  // DollarSign,
  // Activity,
  // ArrowUpRight,
  // ArrowDownRight,
  BarChart3,
  // PieChart,
  // Calendar,
  // Bell,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { Eye } from 'lucide-react'

const UserDashboard = () => {
  // const stats = [
  //   {
  //     title: 'Total Revenue',
  //     value: '$12,345',
  //     change: '+12.5%',
  //     trend: 'up',
  //     icon: DollarSign,
  //   },
  //   {
  //     title: 'Active Users',
  //     value: '1,234',
  //     change: '+8.2%',
  //     trend: 'up',
  //     icon: Users,
  //   },
  //   {
  //     title: 'Conversion Rate',
  //     value: '3.2%',
  //     change: '-2.1%',
  //     trend: 'down',
  //     icon: TrendingUp,
  //   },
  //   {
  //     title: 'Page Views',
  //     value: '45,678',
  //     change: '+15.3%',
  //     trend: 'up',
  //     icon: Activity,
  //   },
  // ]

  const [userGoals, setUserGoals] = useState<Goal[]>([])
  const { user, isLoaded } = useUser()

  useEffect(() => {
    const loadUserGoals = async () => {
      try {
        if (user && user.id) {
          const goals = await getGoals(user.id)
          setUserGoals(goals)
        }
      } catch (error) {
        console.error('Error fetching goals:', error)
      } finally {
        console.log('Goals found')
      }
    }
    if (isLoaded && user && user.id) {
      loadUserGoals()
    }
  }, [isLoaded, user])

  // const recentActivity = [
  //   {
  //     id: 1,
  //     action: 'New user registration',
  //     user: 'John Doe',
  //     created: '2 minutes ago',
  //     type: 'user',
  //   },
  //   {
  //     id: 2,
  //     action: 'Payment received',
  //     user: 'Sarah Smith',
  //     created: '5 minutes ago',
  //     type: 'payment',
  //   },
  //   {
  //     id: 3,
  //     action: 'Support ticket created',
  //     user: 'Mike Johnson',
  //     created: '12 minutes ago',
  //     type: 'support',
  //   },
  //   {
  //     id: 4,
  //     action: 'Product viewed',
  //     user: 'Emma Wilson',
  //     created: '18 minutes ago',
  //     type: 'activity',
  //   },
  //   {
  //     id: 5,
  //     action: 'Account upgraded',
  //     user: 'David Brown',
  //     created: '25 minutes ago',
  //     type: 'upgrade',
  //   },
  // ]

  //The upcoming 5 lines link you to different routes of your application, that function is called for the onclick of the button
  const router = useRouter()

  const goalPage = () => {
    router.push('/application/createGoal')
  }

  const viewGoal = (goalsId: string) => {
    if (user?.id) {
      router.push(`/application/user/${user.id}/goals/${goalsId}`)
    }
  }

  const handleDeleteGoal = async (goalsId: string) => {
    if (!user?.id) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this goal? This action cannot be undone.'
    )
    if (!confirmed) return

    try {
      await deleteGoal(user.id, goalsId)
      setUserGoals(prev => prev.filter(goal => goal.id !== goalsId))
    } catch (error) {
      console.error(error)
      alert('Failed to delete goal')
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
            Dashboard Overview
          </h1>
          <p className='text-muted-foreground mt-1'>
            Welcome back! Here&apos;s what&apos;s happening with your goals
            today.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
            onClick={goalPage}
          >
            <BarChart3 className='h-4 w-4' />
            Create Goal
          </button>
          {/* <button className='p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors'>
            <Bell className='h-4 w-4' />
          </button> */}
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-between'>
              <div className='p-2 bg-blue-500/10 rounded-lg'>
                <stat.icon className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className='h-4 w-4' />
                ) : (
                  <ArrowDownRight className='h-4 w-4' />
                )}
                {stat.change}
              </div>
            </div>
            <div className='mt-4'>
              <h3 className='text-2xl font-bold'>{stat.value}</h3>
              <p className='text-muted-foreground text-sm mt-1'>{stat.title}</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Revenue Chart */}
        {/* <div className='bg-card rounded-xl p-6 border shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-semibold'>Revenue Overview</h3>
              <p className='text-muted-foreground text-sm'>
                Monthly revenue trends
              </p>
            </div>
            <BarChart3 className='h-5 w-5 text-muted-foreground' />
          </div>
          <div className='h-64 bg-muted/20 rounded-lg flex items-center justify-center'>
            <div className='text-center'>
              <BarChart3 className='h-12 w-12 text-muted-foreground mx-auto mb-2' />
              <p className='text-muted-foreground'>
                Revenue chart visualization
              </p>
              <p className='text-sm text-muted-foreground'>
                Chart component goes here
              </p>
            </div>
          </div>
        {/* </div> */}

        {/* User Distribution */}
        {/* <div className='bg-card rounded-xl p-6 border shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-semibold'>User Distribution</h3>
              <p className='text-muted-foreground text-sm'>
                By user type and region
              </p>
            </div>
            <PieChart className='h-5 w-5 text-muted-foreground' />
          </div>
          <div className='h-64 bg-muted/20 rounded-lg flex items-center justify-center'>
            <div className='text-center'>
              <PieChart className='h-12 w-12 text-muted-foreground mx-auto mb-2' />
              <p className='text-muted-foreground'>User distribution chart</p>
              <p className='text-sm text-muted-foreground'>
                Pie chart component goes here
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Creating goal form */}
      {/* <GoalForm /> */}

      {/* Recent Activity */}
      <div className='bg-card rounded-xl p-6 border shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-lg font-semibold'>Recent Goals</h3>
            <p className='text-muted-foreground text-sm'>
              View your latest goals and access them
            </p>
          </div>
          <button className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium'>
            View All
          </button>
        </div>
        <div className='space-y-4'>
          {userGoals.map(goal => (
            <div
              key={goal.id}
              className='flex justify-between items-start gap-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors'
            >
              <div className='flex-1'>
                <p className='font-semibold text-lg'>{goal.title}</p>
                <p className='text-sm text-muted-foreground mt-1'>
                  {goal.description}
                </p>
              </div>
              <div className='self-center'>
                Deadline: {new Date(goal.deadline).toDateString()}
              </div>
              <div className='self-center'>Status: {goal.status}</div>

              <div className='self-center'>
                <button
                  onClick={() => viewGoal(goal.id)}
                  className='text-blue-600 hover:text-blue-700 ...'
                >
                  <Eye className='w-5 h-5' />
                </button>
              </div>
              <div className='self-center'>
                <button className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium'>
                  <Pencil className='w-5 h-5' />
                </button>
              </div>
              <div className='self-center'>
                <button
                  className='text-red-600 hover:text-red-800'
                  onClick={() => handleDeleteGoal(goal.id)} // <-- Wrap in arrow function to pass id
                >
                  <Trash2 className='w-5 h-5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
