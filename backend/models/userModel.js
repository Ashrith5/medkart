const {DataTypes} = require("sequelize")
const sequelize = require("../config/sequelize")

const User = sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate : {
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.ENUM("Customer","admin","seller"),
        defaultValue:"Customer",

    },
},{
    timestamps:true,
});
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports=User