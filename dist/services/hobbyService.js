"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hobbyService = void 0;
const data_1 = require("../data");
exports.hobbyService = {
    addHobby: (userId, hobby) => {
        data_1.users.forEach((user) => {
            if (user.id === userId) {
                user.hobbies.push(hobby);
            }
        });
    }
};
