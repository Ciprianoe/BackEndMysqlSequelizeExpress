import express, {Application} from 'express'
import cors from 'cors';
import routesProduct from '../routes/product'
import routesUser from '../routes/user'
import sequelize from '../db/connection';
import { Product } from './product';
import { User } from './user';

 class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.userParser();
        this.routes();
        this.dbConnect();
        console.log()
       
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server en puerto ' + this.port);
        })
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
        //this.app.use('/api/login', routesUser);
    }


    userParser(){
              /* parseo del body para */
        this.app.use(express.json());
        /*  evitar error de cors */  
        this.app.use(cors());
    }

    async dbConnect(){

            try{
                //await sequelize.authenticate(); 'probar conexion'
                //console.log('Conexion establecida');
                await Product.sync();
                await User.sync();                    
            }catch (error){
                console.error('Unable to connect to the database: ', error);
            }


    }




}

export default Server;