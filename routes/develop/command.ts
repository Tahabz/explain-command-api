import {Router} from 'express'
import {addcommand, deletecommand, getcommand} from '../../controllers/commandController'

const router = Router()

router.post('/add-command', addcommand)
router.delete('/delete-command', deletecommand)
router.get('/get-command/:name', getcommand)

export default router