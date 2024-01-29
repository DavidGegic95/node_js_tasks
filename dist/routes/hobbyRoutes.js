'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const hobbyController_1 = require('../controllers/hobbyController')
const hobbyRoutes = {
  addHobby: (req, res) => hobbyController_1.hobbyController.addHobby(req, res),
}
exports.default = hobbyRoutes
