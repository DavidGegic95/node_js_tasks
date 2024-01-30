import { resBodyCreateUser } from '../helpers/resBodyCreateUser'
import { userService } from '../services/userService'
import { httpStatusCodes } from '../utils/httpsStatusCodes'

export const userController = {
  createUser: (req: any, res: any) => {
    let body = ''
    req.on('data', (chunk: any) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)

        if (!data) {
          res.writeHead(httpStatusCodes.BAD_REQUEST, {
            'Content-Type': 'application/json',
          })
          res.end(JSON.stringify({ message: 'Invalid input data' }))
          return
        }

        const user = userService.createUser(data)

        if (user !== null) {
          const resBody = resBodyCreateUser(user)
          res.writeHead(httpStatusCodes.CREATED, {
            'Content-Type': 'application/json',
          })
          res.end(JSON.stringify(resBody))
        } else {
          res.writeHead(httpStatusCodes.CONFLICT, {
            'Content-Type': 'application/json',
          })
          res.end(
            JSON.stringify({
              message: 'User already exist or invalid input data',
            })
          )
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
        res.writeHead(httpStatusCodes.BAD_REQUEST, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({ message: 'Invalid JSON format' }))
      }
    })
  },
  getAllUsers: (req: any, res: any) => {
    const allUsers = userService.getAllUsers()
    res.writeHead(httpStatusCodes.OK, {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600, public',
    })
    res.end(JSON.stringify({ data: allUsers, error: null }))
  },

  deleteUser: (req: any, res: any) => {
    const urlParts = req.url.split('/')
    const id = urlParts[3]

    const users = userService.deleteUser(id)

    if (users) {
      res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ data: { success: true }, error: null }))
    } else {
      res.writeHead(httpStatusCodes.NOT_FOUND, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: null,
          error: `User with id ${id} doesn't exist`,
        })
      )
    }
  },
}
