const bcrypt = require('bcrypt')
const User = require('../Models/userModel')

//@route /api/users/sign-up
//@desc POST To sign up
//@access public
const signUp = async (req, res) => {
    const { name, email, password, userName } = req.body

    if (!name || !email || !password || !userName) {
        return res
            .status(400)
            .json({ success: false, message: 'Please fill all fields.' })
    }
    try {
        const alreadyExist = await User.findOne({ email: email })
        if (alreadyExist) {
            return res.status(400).json({
                success: false,
                message: 'User with similar email already exist.',
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        // todo: delete password
        const user = new User({
            name,
            email,
            password: hashed,
            userName,
        })
        return res
            .status(201)
            .json({ success: true, message: 'Account created successfully.' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
//@route /api/users/sign-in
//@desc POST To sign in
//@access public
const signIn = async (req, res) => {
    res.status(200).json({ success: true, message: 'Sign In' })
}
//@route /api/users/update-profile
//@desc PUT To update user profile
//@access private
const updateProfile = async (req, res) => {
    res.status(202).json({ success: true, message: 'Update Profile' })
}
//@route /api/users/delete-profile
//@desc DELETE To delete user profile
//@access private
const deleteProfile = async (req, res) => {
    res.status(202).json({ success: true, message: 'Delete Profile' })
}

module.exports = { signUp, signIn, updateProfile, deleteProfile }
