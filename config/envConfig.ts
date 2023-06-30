import dotenv from 'dotenv'

dotenv.config()

interface EnvVariables {
    PORT: string
    MONGO_URL: string
    JWT_SECRET: string
}

const env: EnvVariables = {
    PORT: process.env.PORT || '',
    MONGO_URL: process.env.MONGO_UR || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
}
export default env
