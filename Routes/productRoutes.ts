import { Router } from 'express'
import {
    createProduct,
    allProducts,
    deleteProduct,
    updateProduct,
} from '../controllers/productController'
import { verifyToken } from '../middlewares/authMiddleware'
import validateProductInput from '../middlewares/productValidation'
import productUpdateInput from '../middlewares/productUpdateInput'

const router: Router = Router()

router.post('/create', verifyToken, validateProductInput, createProduct)
router.get('/all-products', verifyToken, allProducts)
router.delete('/:id', verifyToken, deleteProduct)
router.patch('/:id', verifyToken, updateProduct)
export default router
