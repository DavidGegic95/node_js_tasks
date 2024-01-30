import { resBodyCreateUser } from '../helpers/resBodyCreateUser'
import { resBodyHobbies } from '../helpers/resBodyHobbies'
import { hobbyService } from '../services/hobbyService'
import { httpStatusCodes } from '../utils/httpsStatusCodes'

const hobbyController = {
  addHobby: (req: any, res: any) => {
    let body = ''

    req.on('data', (chunk: any) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        const urlParts = req.url.split('/')
        const userId = urlParts[3]

        const user = hobbyService.addHobby(userId, data)

        if (user !== null) {
          res.writeHead(httpStatusCodes.CREATED, {
            'Content-Type': 'application/json',
          })
          res.end(JSON.stringify(resBodyCreateUser(user)))
        } else {
          res.writeHead(httpStatusCodes.NOT_FOUND, {
            'Content-Type': 'application/json',
          })
          res.end(
            JSON.stringify({
              data: null,
              error: `User with id ${userId} doesn't exist`,
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

  getHobbies: (req: any, res: any) => {
    const urlParts = req.url.split('/')
    const id = urlParts[3]

    const user = hobbyService.getHobbies(id)

    if (user) {
      res.writeHead(httpStatusCodes.OK, {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600, private',
      })
      res.end(JSON.stringify(resBodyHobbies(user)))
    } else {
      res.writeHead(httpStatusCodes.NOT_FOUND, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: null,
          error: `User with id ${id} doesn't exist"`,
        })
      )
    }
  },
}

export default hobbyController
