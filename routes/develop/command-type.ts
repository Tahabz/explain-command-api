import {Router} from 'express'
import {addCommandType, deleteCommandType, getCommandType, updateCommandType} from '../../controllers/commandTypeController'

const router = Router()

router.post('/add-command-type', addCommandType)
router.delete('/delete-command-type', deleteCommandType)
router.get('/get-command-type/:name', getCommandType)
router.put('/update-command-type/', updateCommandType)

export default router