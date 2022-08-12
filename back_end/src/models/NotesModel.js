import {Model, DataTypes} from "sequelize";
import sequelize_db from "../config_files/sequelize_db.js";
import UsersModel from "./UsersModel.js";

class NotesModel extends Model {}

NotesModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING(350),
    allowNull: false
  }
}, {
  tableName: "Notes",
  sequelize: sequelize_db,
  engine: "INNODB",
  modelName: "NotesModel"
});

UsersModel.hasMany(NotesModel, {
  foreignKey: "user_id"
});

NotesModel.belongsTo(UsersModel, {
  foreignKey: "user_id"
});

export default NotesModel;
