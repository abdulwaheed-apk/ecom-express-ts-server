const { signUp, signIn, updateProfile, deleteProfile } = require('../Controllers/userController')

const router = require('express').Router()

//@access public
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
//@access private
router.put('/update-profile', updateProfile)
router.delete('/delete-profile', deleteProfile)

module.exports = router