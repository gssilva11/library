import {Router} from 'express'
import user from '../controllers/user.js'

const router = Router()

router.post('/', user.create)

router.put('/:cpf', user.update)

router.delete('/:cpf', user.delete)

router.get('/',user.retrieveAll)
router.get('/cpf/:cpf',user.retrieveByCpf)
router.get('/name/:name',user.retrieveByName)
router.get('/code/:code', user.retrieveByCode)
router.get('/status/available', user.retrieveByAvailable)
router.get('/status/unavailable', user.retrieveByUnavailable)

export default router