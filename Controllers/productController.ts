import { Request, Response } from 'express'
import ProductModel from '../models/productModel'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { QueryOptions, Types } from 'mongoose'
import mongoose from 'mongoose'

interface UpdateProductData {
    title?: string
    description?: string
    price?: number
    category?: string
    brand?: string
    stock?: number
    images?: string[]
    features?: string[]
}

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
        averageRating,
    } = req.body

    const token = req.headers.authorization?.slice(7) || ''
    const decoded: JwtPayload = jwt.decode(token) as JwtPayload
    const id = decoded.id

    try {
        const product = await ProductModel.create({
            title,
            description,
            price,
            category,
            brand,
            stock,
            images,
            features,
            averageRating,
            userId: id,
        })
        // const user = await UserModel.findById(userId)
        res.status(201).json({
            success: true,
            message: 'Successfully created product.',
            product: product,
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}

export const allProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await ProductModel.find()
        res.status(200).json({
            success: true,
            message: 'Successfully got all products.',
            products: allProducts,
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, message: err.message })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product)
            res.status(404).json({
                success: false,
                message: 'Product not found.',
            })
        const result = await ProductModel.findByIdAndRemove(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Product deleted.',
            result: result,
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id
    const updates: UpdateProductData = req.body

    try {
        await ProductModel.findByIdAndUpdate(productId, updates)
        const updatedProduct = await ProductModel.findById(productId)
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            result: updatedProduct,
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
