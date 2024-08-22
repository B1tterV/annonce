import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { getUsers, saveUsers } from '~/server/users'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)
    const config = useRuntimeConfig()
    const secretKey = config.public.SECRET_KEY

    if (!email || !password) {
      throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
    }

    const users = getUsers()
    if (users.find(user => user.email === email)) {
      throw createError({ statusCode: 409, statusMessage: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      image: 'http://localhost:3000/img/agents/agent-1.jpg'
    }

    users.push(newUser)
    saveUsers(users)

    const accessToken = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '7d' })

    return {
      accessToken,
      refreshToken,
      user: { id: newUser.id, email: newUser.email, image: newUser.image }
    }
  } catch (error) {
    console.error('Error in register:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
