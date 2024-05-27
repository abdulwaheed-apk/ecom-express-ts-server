import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { bgWhite, black } from 'colorette'
import morgan from "morgan";

// Routes
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import { verifyToken } from './middlewares/authMiddleware'
import env from './config/envConfig'
import connectDB from './config/connectDatabase'
//*
// import { notFound, errorHandler } from "./middleware/errorMiddleware";
// import orderRoutes from "./routes/orderRoutes";
// import paypalRoutes from "./routes/paypalRoutes";
// import uploadRoutes from "./routes/uploadRoutes";

//*
dotenv.config()
const app: Express = express()
// Middleware to accept JSON in body
app.use(express.json())
// Morgan logging
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// Connect Database
connectDB()

// Routes
app.get('/', async (req: Request, res: Response) => {
    res.send("API IS RUNNING...");
})

// app.use('/api/auth', authRoutes)
// app.use('/api/users', verifyToken, userRoutes)
// app.use('/api/products', verifyToken, productRoutes)

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
// app.use("/api/orders/", orderRoutes);
// app.use("/api/config/paypal", paypalRoutes);
// app.use("/api/upload", uploadRoutes);

// Make uploads folder static
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Use Middleware
// app.use(notFound);
// app.use(errorHandler);

const port = env.PORT || 8000
app.listen(port, () => {
    console.log(bgWhite(black(`Server running at http://localhost:${port}`)))
})
