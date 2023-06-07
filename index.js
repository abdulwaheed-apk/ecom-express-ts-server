//? Packages Import ⬇️
const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { bgWhite, black } = require('colorette')

//? Files Import ⬇️
const { connectDatabase } = require('./config/connectDatabase')
const userRoutes = require('./Routes/userRoutes')


// ? Middleware configurations ⬇️
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// ? Connect Database ⬇️
connectDatabase()

// ? Routes ⬇️
app.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: 'Hello World!' })
})

app.use('/api/users', userRoutes)

// ? Server Listening to port ⬇️
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(bgWhite(black(`Server running at http://localhost:${port}`)))
})