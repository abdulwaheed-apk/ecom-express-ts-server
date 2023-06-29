import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/userModel'

//@route /api/users/update-profile
//@desc PUT To update user profile
//@access private
export const updateProfile = async (req: Request, res: Response) => {
    res.status(202).json({ success: true, message: 'Update Profile' })
}
//@route /api/users/delete-profile
//@desc DELETE To delete user profile
//@access private
export const deleteProfile = async (req: Request, res: Response) => {
    res.status(202).json({ success: true, message: 'Delete Profile' })
}
//@route /api/users/all-users
//@desc GET To get all users
//@access private
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await UserModel.find()
        if (allUsers.length > 0) {
            res.status(200).json({ success: true, data: allUsers })
        } else {
            res.status(404).json({ success: false, message: 'Users Not Found' })
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}
