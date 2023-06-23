import mongoose from 'mongoose'
import { black, bgCyan, bgBlack } from 'colorette'

const connectDatabase = () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test'
    mongoose
        .connect(mongoUrl)
        .then(() => {
            console.log(bgBlack(''))
            console.log(bgCyan(black('MongoDB connected.')))
        })
        .catch((error) => {
            const err = error as Error
            console.error({ message: err.message })
            process.exit(1)
        })
}

export default connectDatabase
