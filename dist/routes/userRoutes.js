"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// userRoutes.ts
const userController_1 = require("../controllers/userController");
const userRoutes = {
    createUser: (req, res) => userController_1.userController.createUser(req, res),
};
exports.default = userRoutes;
