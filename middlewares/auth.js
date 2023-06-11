import express from 'express'

export const verifyToken = (req, res, next) => {
    try {
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
