import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

// Top-level GET function
export async function GET(
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

    const goalsSnapshot = await db
      .collection(`users/${userId}/goals`)
      // .limit(5)
      .get()

    const goals = goalsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ goals })
  } catch (error) {
    console.error('Error fetching user goals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Top-level POST function
export async function POST(request: NextRequest) {
  try {
    const { userId, goal } = await request.json()

    if (!userId || !goal) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    console.log('Creating goal for user:', userId, 'Goal:', goal)

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
    console.error('Error creating goal:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
