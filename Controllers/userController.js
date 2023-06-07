//@route /api/users/sign-up
//@desc POST To sign up
//@access public
const signUp = async (req, res) => {
    res.status(201).json({ success: true, message: 'Sign Up' })
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