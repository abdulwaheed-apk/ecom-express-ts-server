import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { bgWhite, black } from 'colorette'

// Files Import
import connectDatabase from './config/connectDatabase'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import { verifyToken } from './middlewares/auth'
import env from './config/envConfig'

// Middleware configurations
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// Connect Database
connectDatabase()

// Routes
app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Hello World!',
        techStack: [
            { language: 'TypeScript' },
            { framework: 'Express' },
            { database: 'MongoDB' },
            { odm: 'Mongoose' },
            { auth: 'JWT' },
        ],
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', verifyToken, userRoutes)
app.use('/api/products', verifyToken, productRoutes)

const port = env.PORT || 8000
app.listen(port, () => {
    console.log(bgWhite(black(`Server running at http://localhost:${port}`)))
})
