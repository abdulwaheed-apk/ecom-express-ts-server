import express from 'express'
import { updateProfile, deleteProfile } from '../Controllers/userController.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

//@access private
router.patch('/update-profile', verifyToken, updateProfile)
router.delete('/delete-profile', deleteProfile)

export default router
