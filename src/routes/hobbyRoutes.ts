import hobbyController from '../controllers/hobbyController'

const hobbyRoutes = {
  addHobby: (req: any, res: any) => hobbyController.addHobby(req, res),
  getHobbies: (req: any, res: any) => hobbyController.getHobbies(req, res),
}

export default hobbyRoutes
