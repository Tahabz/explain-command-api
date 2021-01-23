import {Router} from 'express'
import explainCommand from '../../controllers/explainCommandController'

const userRouter = Router()

userRouter.post('/', explainCommand)

export default userRouter