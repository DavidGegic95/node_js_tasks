import userRoutes from './routes/userRoutes';
import hobbyRoutes from './routes/hobbyRoutes';
import http from 'http';

const app = http.createServer((req, res) => {

    if (req.url && req.url.startsWith('/api')) {


        if (req.url.startsWith('/api/users')) {
            if (req.method === "GET") {

                const urlParts = req.url.split('/');
                const id = parseInt(urlParts[3]);

                if (id) {
                    userRoutes.getUser(req, res)
                } else {
                    userRoutes.getAllUsers(req, res);
                }
            } else if (req.method === "POST") {
                userRoutes.createUser(req, res)
            } else if (req.method === "DELETE") {
                userRoutes.deleteUser(req, res)

            } else if (req.method === "PATCH") {
                userRoutes.updateUser(req, res)
            } else {
                res.writeHead(405, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            }



        } else if (req.url.startsWith('/api/hobbies')) {
            if (req.method === 'POST') {
                hobbyRoutes.addHobby(req, res);

            } else if (req.method === "DELETE") {
                hobbyRoutes.deleteHobby(req, res)
            } else if (req.method === "GET") {
                hobbyRoutes.getHobbies(req, res)
            } else {
                res.writeHead(405, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            }


        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    }
});


export default app;
