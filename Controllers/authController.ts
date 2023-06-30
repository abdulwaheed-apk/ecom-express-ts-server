import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/userModel'
import { Types } from 'mongoose'
import JWT from 'jsonwebtoken'
import env from '../config/envConfig'
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
        const user = await UserModel.create({
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
            userData: user,
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
    const { email, password } = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Please fill all fields.' })
    } else if (email === '' || password === '') {
        return res.status(400).json({
            success: false,
            message: 'Kindly enter login credentials.',
        })
    }

    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with this email not found.',
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = JWT.sign(
                { id: user._id, userName: user.userName, email: user.email },
                env.JWT_SECRET,
                {
                    expiresIn: '10h',
                    algorithm: 'HS256',
                }
            )

            res.status(200).json({
                success: true,
                message: 'Signed in successfully.',
                jwt: token,
            })
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}
