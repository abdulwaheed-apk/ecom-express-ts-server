import { Schema, Types, model, Model, Document, SchemaOptions } from 'mongoose'

interface Review extends Document {
    product: Types.ObjectId
    user: Types.ObjectId
    rating: number
    comment?: string
}
const reviewSchemaOptions: SchemaOptions<Review> = {
    timestamps: true,
}
const reviewModel: Schema<Review> = new Schema<Review>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    reviewSchemaOptions
)

const ReviewModel: Model<Review> = model<Review>('Review', reviewModel)

export default ReviewModel
