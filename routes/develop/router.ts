import {Router} from 'express'
import commandTypeRouter from './command-type'
import argumentRouter from './argument'
import commandRouter from './command'

const router = Router()

router.use(argumentRouter)
router.use(commandTypeRouter)
router.use(commandRouter)
export default router