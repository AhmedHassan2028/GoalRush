import Link from 'next/link'
import { getIndividualGoal } from '@/lib/services/goalServices'
import { ArrowLeft } from 'lucide-react'

type ViewGoalProps = {
  params: Promise<{ userId: string; goalsId: string }>
}

export default async function OneGoalPage({ params }: ViewGoalProps) {
  const { userId, goalsId } = await params
  const goal = await getIndividualGoal(userId, goalsId)

  return (
    <main className='max-w-3xl mx-auto px-4 py-8'>
      {/* Header */}
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
          <Link
            href={'/application/dashboard'}
            className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
          >
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
          <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Status</p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              {goal.status || 'Not specified'}
            </p>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Deadline</p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              {new Date(goal.deadline).toDateString()}
            </p>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Type</p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              {goal.type}
            </p>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Goal Value
            </p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              {goal.value}
            </p>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 sm:col-span-2'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Current Value
            </p>
            <p className='text-base font-medium text-gray-800 dark:text-gray-100'>
              In the works
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
