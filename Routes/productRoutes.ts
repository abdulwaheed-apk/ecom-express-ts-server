import { Router } from 'express'
import {
    createProduct,
    allProducts,
    deleteProduct,
} from '../controllers/productController'
import { verifyToken } from '../middlewares/auth'
import validateProductInput from '../middlewares/productValidation'

const router: Router = Router()

router.post('/create', verifyToken, validateProductInput, createProduct)
router.get('/all-products', verifyToken, allProducts)
router.delete('/:id', verifyToken, deleteProduct)
export default router
