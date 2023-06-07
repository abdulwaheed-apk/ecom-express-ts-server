const mongoose = require('mongoose')
const { black, bgCyan, bgBlack } = require('colorette')

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

module.exports = { connectDatabase }