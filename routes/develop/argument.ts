import {Router} from 'express'
import {addArgument, deleteArgument, getArgument} from '../../controllers/argumentController'

const router = Router()

router.post('/add-argument', addArgument)
router.delete('/delete-argument', deleteArgument)
router.get('/get-argument/:name', getArgument)

export default router