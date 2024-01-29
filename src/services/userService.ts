import { UserInterface, users } from '../data'
import { hasAllRequiredProperties } from '../helpers/requiredPropertiesUser'
const { v4: uuidv4 } = require('uuid')

export const userService = {
  createUser: (user: any) => {
    const requiredProperties = ['name', 'email']
    if (!hasAllRequiredProperties(user, requiredProperties)) {
      return null
    }
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
  getUser: (userId: string) => {
    let user = users.find(u => u.id === userId)

    if (user) return user

    return null
  },
  updateUser: (userId: string, data: UserInterface) => {
    let user = users.find(u => u.id === userId)

    if (user && data) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          ;(user as any)[key] = (data as any)[key]
        }
      }
      return user
    }
    return null
  },
}
