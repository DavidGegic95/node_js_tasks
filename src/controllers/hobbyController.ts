// src/controllers/hobbyController.ts
import { hobbyService } from '../services/hobbyService';
import { httpStatusCodes } from '../utils/httpsStatusCodes';

const hobbyController = {
    addHobby: (req: any, res: any) => {
        let body = '';

        req.on('data', (chunk: any) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                const userId = parseInt(data.userId);
                const hobby = data.hobby;

                if (!userId || !hobby) {
                    res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid input data' }));
                    return;
                }

                const userHobbies = hobbyService.addHobby(userId, hobby);

                if (userHobbies !== null) {
                    res.writeHead(httpStatusCodes.CREATED, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(userHobbies));
                } else {
                    res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON format' }));
            }
        });
    },

    deleteHobby: (req: any, res: any) => {
        let body = '';
        const urlParts = req.url.split('/');
        const id = parseInt(urlParts[3]);

        req.on('data', (chunk: any) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            const hobby = (data.hobby || null)

            if (hobby) {
                const hobbies = hobbyService.deleteHobby(id, hobby)


                if (hobbies) {
                    res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: "Hobby succesfuly deleted" }))
                } else {
                    res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ message: "User or hobby are not found" }))
                }

            }


        })
    },
    getHobbies: (req: any, res: any) => {
        const urlParts = req.url.split('/');
        const id = parseInt(urlParts[3]);

        const hobbies = hobbyService.getHobbies(id)

        if (hobbies) {
            res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ id: id, hobbies: hobbies }))
        } else {
            res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "User are not found" }))
        }

    }
};

export default hobbyController;
