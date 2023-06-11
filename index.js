//? Packages Import ⬇️
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { bgWhite, black } from 'colorette'

// Files Import
import connectDatabase from './config/connectDatabase.js'
import userRoutes from './Routes/userRoutes.js'
import authRoutes from './Routes/authRoutes.js'
import { verifyToken } from './middlewares/auth.js'

// Middleware configurations
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Connect Database
connectDatabase()

// Routes
app.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: 'Hello World!' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// ? Server Listening to port ⬇️
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(bgWhite(black(`Server running at http://localhost:${port}`)))
})
