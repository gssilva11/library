import {Router} from 'express'
import book from '../controllers/book.js'

const router = Router()

router.post('/', book.create)

router.put('/:code', book.update)

router.delete('/:code', book.delete)

router.get('/',book.retrieveAll)
router.get('/title/:title',book.retrieveByTitle)
router.get('/author/:author',book.retrieveByAuthor)
router.get('/code/:code',book.retrieveByCode)
router.get('/available', book.retrieveAvailable)
router.get('/borrowed', book.retrieveBorrowed)
router.get('/reserved', book.retrieveReserved)

// router.get('/status/:status', book.retrieveByStatus)

export default router