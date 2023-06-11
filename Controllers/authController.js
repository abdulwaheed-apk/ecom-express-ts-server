import bcrypt from 'bcrypt'
import User from '../Models/userModel.js'

//@route /api/users/sign-up
//@desc POST To sign up
//@access public
export const signUp = async (req, res) => {
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
        const user = User.create({
            name,
            email,
            password: hashed,
            userName,
        })
        // todo delete plain password
        // delete req.body.password
        return res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            userData: await user,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
//@route /api/users/sign-in
//@desc POST To sign in
//@access public
export const signIn = async (req, res) => {
    res.status(200).json({ success: true, message: 'Sign In', ...req.body })
}
