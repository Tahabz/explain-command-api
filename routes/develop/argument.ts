import {Router} from 'express'
import {addArgument, deleteArgument, getArgument, updateArgument} from '../../controllers/argumentController'

const router = Router()

router.post('/add-argument', addArgument)
router.delete('/delete-argument', deleteArgument)
router.get('/get-argument/:name', getArgument)
router.put('/update-argument/', updateArgument)

export default router