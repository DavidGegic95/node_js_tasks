'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const userRoutes_1 = __importDefault(require('./routes/userRoutes'))
const hobbyRoutes_1 = __importDefault(require('./routes/hobbyRoutes'))
const http_1 = __importDefault(require('http'))
const app = http_1.default.createServer((req, res) => {
  // Handle routes here
})
// Use user routes
app.on('/api', userRoutes_1.default.createUser)
// Use hobby routes
app.on('/api', hobbyRoutes_1.default.addHobby)
exports.default = app
