import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const getUsers = (req:Request, res:Response) =>{

    console.log(req.body);
    res.json({
        /* aca van a venir las consultas a a DB con sequelize */
        msg: ' Get users',
        body: req.body
    })

}


export const newUser = async (req:Request, res:Response) =>{

   // console.log(req.body);
   //const {body} = req; 
//    usaremos desectruturacion de JS
const {username, password}= req.body;
const hashedPassword = await bcrypt.hash(password,10);
//console.log(username);
//console.log(hashedPassword);

/* validacion de usuario a ver si existe */
 
const user = await User.findOne({where: {username:username }});

if(user){
   return res.status(400).json({
        msg: `Ya existe usuario: ${username} registrado...`       
    });
}
  
    /* guardamos los datos con el modelo creado importandolo */

    try {
        await User.create({
            username:username,
            password:hashedPassword
            })
    
    res.json({
            /* aca van a venir las consultas a a DB con sequelize */        
            msg:`New Users ${username} Created successful` ,
            //body
        })
    
        
    } catch (error) {
        res.status(400).json({
            msg:'Error 400',
            error
        })
    }

   
}


export const loginUser = async (req:Request, res:Response) =>{

    //console.log(req.body);
    /* const {body} = req;
    res.json({
       
        msg: 'Login User ',
        body
    })
 */
    const {username, password}= req.body;
    /* Primero validaremos si el user existe en BD */
    const user:any = await User.findOne({where: {username:username }});
    if(!user){
        return res.status(400).json({
             msg: `No Existe el usuario: ${username}...`       
         });
     }

     /* paso 2 Validar que el password sea correcto por que es un login  */
     const passwordValid = await bcrypt.compare(password,user.password );
     console.log(passwordValid);

     if(!passwordValid){
        return res.status(400).json({
            msg: `Password para Usuario: ${username} es incorrecta`       
        });
     } else{

       /* return res.status(200).json({
            msg: `Usuario: ${username} Login`       
        });*/
        
     /* paso 3 generar el JWT */
    
   const token =  jwt.sign({
    username:username,
 },process.env.SECRET_KEY || 'peter123');

// res.json({token:token});
res.json(token);


     } 
 


}