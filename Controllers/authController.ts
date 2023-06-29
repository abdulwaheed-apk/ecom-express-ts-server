import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/userModel'

//@route /api/auth/sign-up
//@desc POST To sign up
//@access public
export const signUp = async (req: Request, res: Response) => {
    const { name, email, password, userName } = req.body

    if (!name || !email || !password || !userName) {
        return res
            .status(400)
            .json({ success: false, message: 'Please fill all fields.' })
    }
    try {
        const alreadyExist = await UserModel.findOne({ email: email })
        if (alreadyExist) {
            return res.status(400).json({
                success: false,
                message: 'User with similar email already exist.',
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const user = UserModel.create({
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
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}
//@route /api/auth/sign-in
//@desc POST To sign in
//@access public
export const signIn = async (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Sign In', ...req.body })
}
