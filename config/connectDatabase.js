import mongoose from 'mongoose'
import { black, bgCyan, bgBlack } from 'colorette'

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log(bgBlack())
            console.log(bgCyan(black('MongoDB connected.')))
        })
        .catch((error) => {
            console.error({ message: error })
            process.exit(1)
        })
}

export default connectDatabase
