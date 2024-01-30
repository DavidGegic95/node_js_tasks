'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.hobbyController = void 0
const httpsStatusCodes_1 = require('../utils/httpsStatusCodes')
exports.hobbyController = {
  addHobby: (req, res) => {
    res
      .status(httpsStatusCodes_1.httpStatusCodes.CREATED)
      .json({ message: 'Hobby added successfully' })
  },
}
