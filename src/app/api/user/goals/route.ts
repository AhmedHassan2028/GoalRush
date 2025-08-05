import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

export async function POST(request: NextRequest) {
  try {
    // Extract the userId from query parameters
    const { userId, goal } = await request.json()

    if (!userId || !goal) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    console.log('Creating goal for user:', userId, 'Goal:', goal)

    // Using Admin SDK to create a new goal
    const goalRef = db.collection('users').doc(userId).collection('goals').doc()
    const createdGoal = {
      id: goalRef.id,
      ...goal,
    }

    await goalRef.set(createdGoal)
    console.log('Goal created:', createdGoal)

    return NextResponse.json(createdGoal, { status: 201 })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
