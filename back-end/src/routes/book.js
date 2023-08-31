import {Router} from 'express'
import book from '../controllers/book.js'

const router = Router()

router.post('/', book.create)
router.get('/',book.retrieveAll)
router.get('/title/:title',book.retrieveOneTitle)
router.get('/author/:author',book.retrieveOneAuthor)
router.get('/code/:code',book.retrieveOneCode)
router.put('/:id', book.updateAvailable)
//router.update('/',book.update) coloca o que no '/' ?

export default router