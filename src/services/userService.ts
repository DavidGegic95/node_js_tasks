import {  users, UserUpdate } from "../data";
import { hasAllRequiredProperties } from "../helpers/requiredPropertiesUser";


export const userService = {
    createUser: (user: any) => {
        const requiredProperties = ['id', 'username', 'email']
        if (!hasAllRequiredProperties(user, requiredProperties)) {
            return null
        }
        const alreadyExist = users.some((u) => u.email === user.email)
        if (!alreadyExist) {
            users.push(user)
            return users

        } else {
            return null
        }

    },
    getAllUsers: () => {
        const allUsers = users.map((user) => ({ id: user.id, name: user.name, email: user.email }))
        return allUsers
    },
    deleteUser: (userId: number) => {
        const indexToRemove = users.findIndex(user => user.id === userId);
        if (indexToRemove !== -1) {
            users.splice(indexToRemove, 1);
            return users
        } else {
            return null
        }
    },
    getUser: (userId: number) => {
        let user = users.find((u) => u.id === userId)

        if (user) return user

        return null
    },
    updateUser: (userId: number, data: UserUpdate) => {
        let user = users.find((u) => u.id === userId)

        if (user && data) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    (user as any)[key] = (data as any)[key];
                }
            }
            return user
        }
        return null
    }
}



