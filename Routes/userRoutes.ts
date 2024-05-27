import { Router } from 'express'
import {
    updateProfile,
    deleteProfile,
    getAllUsers,
} from '../controllers/userController'
import { verifyToken } from '../middlewares/authMiddleware'

const router: Router = Router()

//@access private
router.patch('/update-profile', verifyToken, updateProfile)
router.delete('/delete-profile', verifyToken, deleteProfile)
router.get('/all-users', getAllUsers)

export default router
