import { Request, Response } from "express"
import { Product } from "../models/product"

export const getProducts = async (req:Request, res:Response) =>{
    const listProducts = await Product.findAll();
   /* aca van a venir las consultas a a DB con sequelize */
    // res.json({msg: 'Productos Get'})
    res.json(listProducts);


}