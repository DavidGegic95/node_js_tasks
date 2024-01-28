export const users: UserInterface[] = [
    {
        id: 1,
        name: 'Ann',
        email: 'ann@google.com',
        hobbies: ['books', 'sport', 'dancing'],
    },
    {
        id: 2,
        name: 'Ben',
        email: 'ben@google.com',
        hobbies: ['series', 'sport'],
    },
];


export interface UserInterface {
    id: number,
    name: string,
    email: string,
    hobbies: string[]

}
export type UserUpdate = {
    [key in keyof UserInterface]?: UserInterface[key];
};