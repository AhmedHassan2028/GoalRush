import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

export async function GET(
  // Underscore prefix indicates unused param
  _request: Request,
  props: { params: Promise<{ userId: string }> }
) {
  const params = await props.params
  try {
    const { userId } = params

    if (!userId) {
      console.error('Unauthorized access attempt without userId')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all goals for the user
    const goalsSnapshot = await db.collection(`users/${userId}/goals`).get()
    const goals = goalsSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })

    return NextResponse.json({ goals })
  } catch (error) {
    console.error('Error fetching user goals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
      status: 'active',
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
