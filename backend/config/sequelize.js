require('dotenv').config();
const {Sequelize} = require("sequelize")


const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"mysql",
        logging:false,
    }
);
(async () =>{
    try{
        await sequelize.authenticate();
        console.log("Mysql connection successful")
    } catch(err){
        console.error("Mysql connection failed",err)
    }
})();
module.exports=sequelize;
