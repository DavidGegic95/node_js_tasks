import { users } from '../data'
import { hasAllRequiredProperties } from '../helpers/requiredPropertiesUser'
import { v4 as uuidv4 } from 'uuid'

export const userService = {
  createUser: (user: any) => {
    const requiredProperties = ['name', 'email']
    if (!hasAllRequiredProperties(user, requiredProperties)) return null

    const alreadyExist = users.some(u => u.email === user.email)
    if (!alreadyExist) {
      const createdUser = {
        id: uuidv4(),
        name: user.name,
        email: user.email,
        hobbies: [],
      }
      users.push(createdUser)
      return createdUser
    } else {
      return null
    }
  },
  getAllUsers: () => {
    const allUsers = users.map(user => ({
      user: { id: user.id, name: user.name, email: user.email },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`,
      },
    }))
    return allUsers
  },
  deleteUser: (userId: string) => {
    const indexToRemove = users.findIndex(user => user.id === userId)
    if (indexToRemove !== -1) {
      users.splice(indexToRemove, 1)
      return users
    } else {
      return null
    }
  },
}
