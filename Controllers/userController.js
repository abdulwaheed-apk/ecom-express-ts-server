import bcrypt from 'bcrypt'
import User from '../Models/userModel.js'

//@route /api/users/update-profile
//@desc PUT To update user profile
//@access private
export const updateProfile = async (req, res) => {
    res.status(202).json({ success: true, message: 'Update Profile' })
}
//@route /api/users/delete-profile
//@desc DELETE To delete user profile
//@access private
export const deleteProfile = async (req, res) => {
    res.status(202).json({ success: true, message: 'Delete Profile' })
}
