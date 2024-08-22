import fs from 'fs'
import path from 'path'

import type { User } from '~/types/User'

const filePath = path.resolve('server/users.json')

export const getUsers = () => {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data) as User[]
}

export const saveUsers = (users: User[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}
