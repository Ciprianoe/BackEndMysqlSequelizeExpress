import { Sequelize } from "sequelize";


const sequelize = new Sequelize('rrhh','root','',{
    host: 'localhost',
    dialect:'mysql',
});

export default sequelize;