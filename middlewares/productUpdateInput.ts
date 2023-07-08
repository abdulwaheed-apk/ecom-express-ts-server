import { Request, Response, NextFunction } from 'express'

interface ProductValidationErrors {
    [key: string]: string
}

const productUpdateInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        title,
        description,
        price,
        category,
        brand,
        stock,
        images,
        features,
    } = req.body

    const errors: ProductValidationErrors = {}

    if (typeof title !== 'string') {
        errors.title = 'Title is required and must be a string.'
    }

    if (typeof description !== 'string') {
        errors.description = 'Description is required and must be a string.'
    }

    if (typeof price !== 'number' || price <= 0) {
        errors.price = 'Price is required and must be a positive number.'
    }

    if (typeof category !== 'string') {
        errors.category = 'Category is required and must be a string.'
    }

    if (typeof brand !== 'string') {
        errors.brand = 'Brand is required and must be a string.'
    }

    if (typeof stock !== 'number' || stock < 0) {
        errors.stock = 'Stock is required and must be a non-negative number.'
    }

    if (
        Array.isArray(images) ||
        images.some((image?: string) => typeof image !== 'string')
    ) {
        errors.images = 'Images are required and must be an array of strings.'
    }

    if (
        Array.isArray(features) ||
        features.some((feature?: string) => typeof feature !== 'string')
    ) {
        errors.features =
            'Features are required and must be an array of strings.'
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }

    next()
}

export default productUpdateInput
