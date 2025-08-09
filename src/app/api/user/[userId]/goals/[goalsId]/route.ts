import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

// GET individual goal
export async function GET(
  _request: Request,
  context: { params: Promise<{ userId: string; goalsId: string }> }
) {
  const { userId, goalsId } = await context.params

  if (!userId || !goalsId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const goalDoc = await db
      .collection('users')
      .doc(userId)
      .collection('goals')
      .doc(goalsId)
      .get()

    if (!goalDoc.exists) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    return NextResponse.json({ goal: { id: goalDoc.id, ...goalDoc.data() } })
  } catch (error) {
    console.error('Error fetching individual goal:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST new goal
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

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ userId: string; goalsId: string }> }
) {
  const { userId, goalsId } = await context.params

  if (!userId || !goalsId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await db
      .collection('users')
      .doc(userId)
      .collection('goals')
      .doc(goalsId)
      .delete()

    return NextResponse.json(
      { message: 'Goal deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting goal:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
