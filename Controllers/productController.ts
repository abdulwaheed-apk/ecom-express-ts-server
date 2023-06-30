import { Request, Response } from 'express'
import ProductModel from '../models/productModel'

export const createProduct = async (req: Request, res: Response) => {
    const {
        title,
        description,
        price,
        category,
        brand,
        stock,
        images,
        features,
        sku,
        userId,
    } = req.body
    try {
        res.status(200).json({ success: true, message: 'Create product.' })
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}
