'use client'

import Link from 'next/link'
import { getIndividualGoal } from '@/lib/services/goalServices'
import { ArrowLeft, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import type { Goal } from '@/types'
// import GoalEditCard from '@/components/ui/editForm'

export default function OneGoalPage() {
  const { goalsId } = useParams<{ goalsId: string }>()
  const [goal, setGoal] = useState<Goal | null>(null)
  const { user, isLoaded } = useUser()

  useEffect(() => {
    const displayGoal = async () => {
      try {
        if (user?.id && goalsId) {
          const goalInfo = await getIndividualGoal(user.id, goalsId)
          setGoal(goalInfo)
        }
      } catch (error) {
        console.error('Error fetching goal:', error)
      }
    }

    if (isLoaded && user?.id && goalsId) {
      displayGoal()
    }
  }, [isLoaded, user, goalsId])

  if (!goal) {
    return (
      <main className='max-w-3xl mx-auto px-4 py-8'>
        <p className='text-gray-500 dark:text-gray-400'>Loading goal...</p>
      </main>
    )
  }

  return (
    <main className='max-w-3xl mx-auto px-4 py-8'>
      <header className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Goal Details
        </h1>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Viewing information for goal ID: {goalsId}
        </div>
      </header>

      <section className='bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
              {goal.title}
            </h2>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              {goal.description}
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <Link
              href={'/application/dashboard'}
              className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer'
              aria-label='Back to dashboard'
            >
              <ArrowLeft className='w-5 h-5' />
            </Link>
            <button
              className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium cursor-pointer'
              aria-label='Edit goal'
            >
              <Pencil className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Status */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Status</p>
          <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
            {goal.status || 'Not specified'}
          </p>
        </div>

        {/* Deadline */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Deadline</p>
          <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
            {goal.deadline
              ? new Date(goal.deadline).toDateString()
              : 'No deadline'}
          </p>
        </div>

        {/* Type */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Type</p>
          <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
            {goal.type}
          </p>
        </div>

        <div className='flex gap-4'>
          {/* Current Value Card */}
          <div className='flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Current Value
            </p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              {goal.currentValue}
            </p>
          </div>

          {/* Goal Value Card */}
          <div className='flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Goal Value
            </p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              {goal.value}
            </p>
          </div>
        </div>
      </section>
      {/* <section>
        <GoalEditCard goalId={goalsId} initialData={{}} />
      </section> */}
    </main>
  )
}
