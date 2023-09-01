import {Router} from 'express'
import publisher from '../controllers/publisher.js'

const router = Router()

router.post('/', publisher.create)

router.put('/:id_p', publisher.update)

router.delete('/:id_p', publisher.delete)

router.get('/',publisher.retrieveAll)
router.get('/id/:id_p',publisher.retrieveById)
router.get('/name/:name_p',publisher.retrieveByName)

export default router