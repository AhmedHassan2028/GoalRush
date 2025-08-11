'use client'

import EditGoalForm from '@/components/ui/editForm'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import React from 'react'

export default function EditPage() {
  const { userId, goalsId } = useParams()
  const { user } = useUser()

  return (
    <EditGoalForm
      userId={Array.isArray(userId) ? userId[0] : (userId ?? user?.id ?? '')}
      goalId={Array.isArray(goalsId) ? goalsId[0] : (goalsId ?? '')}
    />
  )
}
