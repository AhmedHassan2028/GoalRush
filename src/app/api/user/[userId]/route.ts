import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

export async function GET(request: NextRequest) {
  try {
    // Extract the userId from query parameters
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Using Admin SDK
    const userDoc = await db.doc(`users/${userId}`).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userDoc.data())
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
