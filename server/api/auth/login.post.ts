import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { getUsers } from '~/server/users'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const config = useRuntimeConfig()
  const secretKey = config.public.SECRET_KEY

  const users = getUsers()
  const user = users.find(user => user.email === email)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' })
  const refreshToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: '7d' })

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, image: user.image }
  }
})
