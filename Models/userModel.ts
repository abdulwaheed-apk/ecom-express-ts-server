import { Schema, model, Document, SchemaOptions, Model } from 'mongoose'

interface User extends Document {
    name?: string
    email: string
    password: string
    userName: string
}

const userSchemaOptions: SchemaOptions<User> = {
    timestamps: true,
}

const userSchema: Schema<User> = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required and should be unique.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
        userName: {
            type: String,
            required: [true, 'Username is required and should be unique.'],
            unique: true,
        },
    },
    userSchemaOptions
)

const UserModel: Model<User> = model<User>('User', userSchema)

export default UserModel
