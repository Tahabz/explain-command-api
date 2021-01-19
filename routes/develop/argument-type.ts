import {Router} from 'express'
import {addArgument, deleteArgument, getArgument} from '../../controllers/argumentController'

const router = Router()

router.post('/add-argument-type', addArgument)
router.delete('/delete-argument-type', deleteArgument)
router.get('/get-argument-type/:name', getArgument)

export default router