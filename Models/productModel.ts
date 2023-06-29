import { Schema, model, Document, Types, Model, SchemaOptions } from 'mongoose'
import crypto from 'crypto'

interface Product extends Document {
    title: string
    description: string
    price: number
    category: string
    brand: string
    stock: number
    images: string[]
    features: string[]
    averageRating?: number
    sku: string
    userId: Types.ObjectId
}

const productSchemaOptions: SchemaOptions<Product> = {
    timestamps: true,
}

const productSchema: Schema<Product> = new Schema<Product>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        features: {
            type: [String],
            required: true,
        },
        averageRating: Number,
        sku: {
            type: String,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    productSchemaOptions
)

// Pre-save hook in Mongoose to generate the SKU before saving the product to the database.
productSchema.pre('save', async function (next) {
    if (!this.sku) {
        const sku = generateUniqueSku()
        this.sku = sku
    }
    next()
})

function generateRandomString(length: number): string {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
}

function generateUniqueSku(): string {
    const timestamp: string = Date.now().toString(36) // Convert current timestamp to base36 string
    const randomChars: string = generateRandomString(5) // Generate random alphanumeric characters

    const uniqueSku: string = `${timestamp}-${randomChars}` // Combine timestamp and random characters
    return uniqueSku
}

const ProductModel: Model<Product> = model<Product>('Product', productSchema)

export default ProductModel
