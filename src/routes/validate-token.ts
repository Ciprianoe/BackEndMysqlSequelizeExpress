import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";


const validateToken = (req:Request, res:Response, next:NextFunction) =>{
    //console.log('validate token'); 
    const headerToken = req.headers['authorization'];
    // console.log(headerToken)      

    /* validamos el que tengamos el token  */

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        /* tiene token  */
        try {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'petter123');
            next();        
        } catch (error) {
            res.status(401).json({
                msg: 'Token Invalido'
            })
        }        
    }else{
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
}
export default  validateToken;