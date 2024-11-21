// server/api/auth/signup.post.ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  // Input validation
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: 'Password must be at least 8 characters long'
    })
  }

  try {
    // In a real app, you'd validate against your database
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    )

    // Return user data and token
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    // Handle database errors
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }
    throw error
  }
})