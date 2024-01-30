import { UserInterface } from '../data'

export const resBodyHobbies = (user: UserInterface) => {
  return {
    data: {
      hobbies: user.hobbies,
      links: {
        self: `/api/users/${user.id}/hobbies`,
        user: `/api/users/${user.id}`,
      },
    },
    error: null,
  }
}
