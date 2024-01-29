import { userService } from "../services/userService";
import { httpStatusCodes } from "../utils/httpsStatusCodes";


export const userController = {
    createUser: (req: any, res: any) => {
        {
            let body = '';
            req.on('data', (chunk: any) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);

                    if (!data) {
                        res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Invalid input data' }));
                        return;
                    }

                    const users = userService.createUser(data)

                    if (users !== null) {
                        res.writeHead(httpStatusCodes.CREATED, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(users));
                    } else {
                        res.writeHead(httpStatusCodes.CONFLICT, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'User already exist or invalid input data' }));
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid JSON format' }));
                }
            });
        }

    },
    getAllUsers: (req: any, res: any) => {
        const allUsers = userService.getAllUsers();
        res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allUsers));
    },

    deleteUser: (req: any, res: any) => {
        const urlParts = req.url.split('/');
        const id = parseInt(urlParts[3]);

        const users = userService.deleteUser(id)

        if (users) {
            res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "User succsefully deleted" }))
        } else {
            res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "User not found" }))
        }

    },

    getUser: (req: any, res: any) => {
        const urlParts = req.url.split('/');
        const id = parseInt(urlParts[3]);


        const user = userService.getUser(id)
        const link = { href: `http://localhost:3000/api/hobbies/${id}`, method: 'GET', rel: 'hobbies' }


        if (user) {
            res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ name: user.name, email: user.email, id: user.id, hobbies: link }))
        } else {
            res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "User not found" }))
        }



    },
    updateUser: (req: any, res: any) => {
        const urlParts = req.url.split('/');
        const id = parseInt(urlParts[3]);
        let body = '';
        req.on('data', (chunk: any) => {
            body += chunk.toString();
        });
        req.on('end', () => {

            if (body) {
                const data = JSON.parse(body);

                const user = userService.updateUser(id, data)
                if (user) {
                    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(user))
                } else {
                    res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: "User not found" }))
                }

            } else {
                res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: "User id, or user info missing." }))

            }
        })

    }

}