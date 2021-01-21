import {Router} from 'express'
import explainNpm from '../../controllers/explainCommandController'

const userRouter = Router()

userRouter.post('/npm', explainNpm)

export default userRouter