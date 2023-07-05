import { Request, Response, NextFunction } from 'express'

interface ProductValidationErrors {
    [key: string]: string
}

function validateProductInput(req: Request, res: Response, next: NextFunction) {
    const {
        title,
        description,
        price,
        category,
        brand,
        stock,
        images,
        features,
        averageRating,
    } = req.body

    const errors: ProductValidationErrors = {}

    if (!title || typeof title !== 'string') {
        errors.title = 'Title is required and must be a string.'
    }

    if (!description || typeof description !== 'string') {
        errors.description = 'Description is required and must be a string.'
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        errors.price = 'Price is required and must be a positive number.'
    }

    if (!category || typeof category !== 'string') {
        errors.category = 'Category is required and must be a string.'
    }

    if (!brand || typeof brand !== 'string') {
        errors.brand = 'Brand is required and must be a string.'
    }

    if (!stock || typeof stock !== 'number' || stock < 0) {
        errors.stock = 'Stock is required and must be a non-negative number.'
    }

    if (
        !Array.isArray(images) ||
        images.some((image) => typeof image !== 'string')
    ) {
        errors.images = 'Images are required and must be an array of strings.'
    }

    if (
        !Array.isArray(features) ||
        features.some((feature) => typeof feature !== 'string')
    ) {
        errors.features =
            'Features are required and must be an array of strings.'
    }

    if (averageRating && typeof averageRating !== 'number') {
        errors.averageRating = 'Average rating must be a number.'
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }

    next()
}

export default validateProductInput
