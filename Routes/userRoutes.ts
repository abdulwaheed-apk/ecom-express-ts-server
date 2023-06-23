import express, {Router} from 'express'
import { updateProfile, deleteProfile } from '../Controllers/userController'
import { verifyToken } from '../middlewares/auth'

const router:Router = express.Router()

//@access private
router.patch('/update-profile', verifyToken, updateProfile)
router.delete('/delete-profile', deleteProfile)

export default router
