import jwt from 'jsonwebtoken'

import { getUsers } from '~/server/users'

export default defineEventHandler((event) => {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.split(' ')[1]
  const config = useRuntimeConfig()
  const secretKey = config.public.SECRET_KEY

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: number }
    const users = getUsers()
    const user = users.find(user => user.id === decoded.id)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'User not found' })
    }

    return { id: user.id, email: user.email }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
