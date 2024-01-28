"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const data_1 = require("../data");
exports.userService = {
    createUser: (user) => {
        data_1.users.push(user);
    }
};
