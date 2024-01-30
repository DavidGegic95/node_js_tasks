'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.userController = void 0
const httpsStatusCodes_1 = require('../utils/httpsStatusCodes')
exports.userController = {
  createUser: (req, res) => {
    res
      .status(httpsStatusCodes_1.httpStatusCodes.CREATED)
      .json({ message: 'User created successfully' })
  },
}
