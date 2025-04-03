import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data.json')

interface User {
  id: number
  firstName: string
  lastName: string
  day: number
  month: number
  year: number
  gender: string
  email: string
  password: string
  createdAt: string
  posts: []
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function POST(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 })
  }

  try {
    const userData = await req.json()
    
    const requiredFields = ['firstName', 'lastName', 'day', 'month', 'year', 'gender', 'email', 'password']
    const missingFields = requiredFields.filter(field => !userData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400, headers }
      )
    }

    let users: User[] = []
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf-8')
      try {
        users = JSON.parse(fileData)
        if (!Array.isArray(users)) {
          throw new Error('Invalid data format')
        }
      } catch (e) {
        console.error(e)
        users = []
      }
    }

    if (users.some(user => user.email === userData.email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409, headers }
      )
    }

    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...userData,
      posts: [], 
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2))

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      },
      { status: 201, headers }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers }
    )
  }
}