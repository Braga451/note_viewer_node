import {Model, DataTypes} from "sequelize";
import sequelize_db from "../config_files/sequelize_db.js";

class UsersModel extends Model{}

UsersModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username : {
    type: DataTypes.STRING(200),
    allowNull : false
  },
  email : {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  user_password : {
    type: DataTypes.STRING(60), // Rember: use bcrypt
    allowNull: false
  },
  path_img : {
    type: DataTypes.STRING(200),
    allowNull: true
  },
}, {
  tableName: "Users",
  sequelize: sequelize_db,
  engine: "INNODB",
  modelName: "UsersModel"
});

export default UsersModel;
