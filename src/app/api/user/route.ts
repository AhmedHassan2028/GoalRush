/* eslint-disable prettier/prettier */
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    const { firstName, lastName, createdAt, fullName, emailAddresses } = user
    const email = emailAddresses && emailAddresses.length > 0 ? emailAddresses[0].emailAddress : null

    return NextResponse.json({
      firstName,
      lastName,
      email,
      createdAt,
      fullName
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
