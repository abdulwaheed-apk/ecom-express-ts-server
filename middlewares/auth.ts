import express, {Request, Response,NextFunction, ErrorRequestHandler } from 'express'

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    try {
        //some code
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}
