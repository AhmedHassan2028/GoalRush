import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'
import { Goal } from '@/types'

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

    const goal = { id: goalDoc.id, ...goalDoc.data() } as Goal

    // ✅ Auto-expire if deadline passed and still active
    const now = new Date()
    if (
      goal.deadline &&
      new Date(goal.deadline) < now &&
      goal.status === 'active'
    ) {
      await db
        .collection('users')
        .doc(userId)
        .collection('goals')
        .doc(goalsId)
        .update({ status: 'expired/failed' })
      goal.status = 'expired/failed'
    }

    return NextResponse.json({ goal })
  } catch (error) {
    console.error('Error fetching individual goal:', error)
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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ userId: string; goalsId: string }> }
) {
  const { userId, goalsId } = await context.params

  if (!userId || !goalsId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()

    const goalRef = db
      .collection('users')
      .doc(userId)
      .collection('goals')
      .doc(goalsId)

    await goalRef.update(data)

    const updatedGoalDoc = await goalRef.get()

    if (!updatedGoalDoc.exists) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    return NextResponse.json(
      { goal: { id: updatedGoalDoc.id, ...updatedGoalDoc.data() } },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating goal:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
