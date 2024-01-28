import { users } from "../data";


export const hobbyService = {
    addHobby: (userId: number, hobby: string) => {
        const user = users.find((u) => u.id === userId);

        if (user) {
            user.hobbies.push(hobby);
            return user.hobbies;
        }

        return null;
    },
    deleteHobby: (userId: number, hobby: string) => {
        const user = users.find((u) => u.id === userId);

        if (user) {
            const indexToRemove = user.hobbies.findIndex(h => h === hobby);
            user?.hobbies.splice(indexToRemove, 1)
            return user.hobbies

        } else {
            return null

        }
    },
    getHobbies: (userId: number) => {
        const user = users.find((u) => u.id === userId);

        if (user) {
            return user.hobbies
        } else {
            return null
        }

    }
}