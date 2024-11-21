import { prisma } from './prisma'

export async function cleanupSessions() {
  try {
    await prisma.session.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    })
  } catch (error) {
    console.error('Error cleaning up sessions:', error)
  }
}

export async function cleanupVerifyTokens() {
  try {
    await prisma.verifyToken.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    })
  } catch (error) {
    console.error('Error cleaning up verify tokens:', error)
  }
}