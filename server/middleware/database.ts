import { cleanupSessions, cleanupVerifyTokens } from '../utils/db'

export default defineEventHandler(async () => {
  // Clean up expired sessions and tokens periodically
  if (Math.random() < 0.1) { // 10% chance to run cleanup on each request
    await Promise.all([
      cleanupSessions(),
      cleanupVerifyTokens()
    ])
  }
})