import mongoose,{Error, ConnectOptions} from 'mongoose'
import { black, bgCyan, bgBlack } from 'colorette'

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mern'
    if(process.env.MONGO_URL !== undefined){
try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      const err = error as Error
            console.error(`Error : ${err.message}`)
      process.exit(1);
    }
    }
}

export default connectDB
