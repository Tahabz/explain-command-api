import {Router} from 'express'
import commandRouter from './command-type'

const router = Router()

export default router.use(commandRouter)