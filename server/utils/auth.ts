import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import type { H3Event } from 'h3'

interface DecodedToken {
  userId: string
  iat: number
  exp: number
}

export async function getAuth(event: H3Event) {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) return null

    const token = authHeader.split(' ')[1]
    if (!token) return null

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken

    // Check if session exists in database
    const session = await prisma.session.findFirst({
      where: {
        userId: decoded.userId,
        token: token,
        expires: {
          gt: new Date()
        }
      }
    })

    if (!session) return null

    return {
      userId: decoded.userId,
      token
    }
  } catch (error) {
    return null
  }
}