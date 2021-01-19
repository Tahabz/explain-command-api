import {Router} from 'express'
import {addCommandType, deleteCommandType, getCommandType} from '../../controllers/commandTypeController'

const router = Router()

router.post('/add-command-type', addCommandType)
router.delete('/', deleteCommandType)
router.get('/get', getCommandType)

export default router