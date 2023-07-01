import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import env from '../config/envConfig'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.slice(7)

    try {
        if (token) {
            const verified: JwtPayload = jwt.verify(token, env.JWT_SECRET) as JwtPayload

            const expiryTime: number = verified.exp || 0
            const currentTime = Math.floor(Date.now() / 1000)

            if (currentTime > expiryTime) {
                return res.status(401).json({ success: true, message: 'Token expired.' })
            }
        } else {
            res.status(401).json({ success: false, message: 'Token missing.' })
        }

        next()
    } catch (error) {
        const err = error as Error
        res.status(401).json({ success: false, message: err.message })
    }
}
