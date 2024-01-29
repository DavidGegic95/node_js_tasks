export const resBodyCreateUser = (user: {
  id: string
  name?: string
  email?: string
  hobbies?: string[]
}) => {
  return {
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`,
      },
    },
  }
}
