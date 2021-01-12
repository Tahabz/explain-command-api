import {Router} from 'express'
import {addCommandType, deleteCommandType, getCommandType} from '../../controllers/commandTypeController'

const router = Router()

router.post('/add', addCommandType)
router.delete('/delete', deleteCommandType)
router.get('/get', getCommandType)