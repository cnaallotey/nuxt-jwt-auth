import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export function handleDatabaseError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw createError({
          statusCode: 400,
          message: 'This record already exists.'
        })
      case 'P2025':
        throw createError({
          statusCode: 404,
          message: 'Record not found.'
        })
      default:
        console.error('Database error:', error)
        throw createError({
          statusCode: 500,
          message: 'Database error occurred.'
        })
    }
  }
  throw error
}