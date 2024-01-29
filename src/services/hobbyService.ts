import { users } from '../data'

export const hobbyService = {
  addHobby: (
    userId: string,
    data: {
      hobbies: string[]
    }
  ) => {
    const user = users.find(u => u.id === userId)

    if (user) {
      user.hobbies = [...user.hobbies, ...data.hobbies]
      return user
    }

    return null
  },
  deleteHobby: (userId: string, hobby: string) => {
    const user = users.find(u => u.id === userId)

    if (user) {
      const indexToRemove = user.hobbies.findIndex(h => h === hobby)
      user?.hobbies.splice(indexToRemove, 1)
      return user.hobbies
    } else {
      return null
    }
  },
  getHobbies: (userId: string) => {
    const user = users.find(u => u.id === userId)

    return user ? user : null
  },
}
