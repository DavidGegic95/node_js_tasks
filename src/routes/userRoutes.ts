// userRoutes.ts
import { userController } from '../controllers/userController';

const userRoutes = {
    createUser: (req: any, res: any) => userController.createUser(req, res),
    getAllUsers: (req: any, res: any) => userController.getAllUsers(req, res),
    deleteUser: (req: any, res: any) => userController.deleteUser(req, res),
    getUser: (req: any, res: any) => userController.getUser(req, res),
    updateUser: (req: any, res: any) => userController.updateUser(req, res)


};

export default userRoutes;
