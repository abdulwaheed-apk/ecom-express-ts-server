import express from 'express'
import { signUp, signIn } from '../Controllers/authController.js'

const router = express.Router()

//@access public
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

export default router
