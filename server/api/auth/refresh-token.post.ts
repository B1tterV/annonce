import jwt from 'jsonwebtoken'

import { getUsers } from '~/server/users'

export default defineEventHandler(async (event) => {
  const { refreshToken } = await readBody(event)
  const config = useRuntimeConfig()
  const secretKey = config.public.SECRET_KEY

  if (!refreshToken) {
    throw createError({ statusCode: 401, statusMessage: 'No refresh token provided' })
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey) as { id: number }
    const users = getUsers()
    const user = users.find(user => user.id === decoded.id)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid refresh token' })
    }

    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' })
    const newRefreshToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: '7d' })

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid refresh token' })
  }
})
