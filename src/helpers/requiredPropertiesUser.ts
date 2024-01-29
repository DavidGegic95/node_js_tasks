import { UserInterface } from "../data";

export const hasAllRequiredProperties = (user: UserInterface, requiredProperties: string[]) => {
    return requiredProperties.every(property => user.hasOwnProperty(property));
}