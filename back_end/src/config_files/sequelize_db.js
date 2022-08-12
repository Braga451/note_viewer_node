import "dotenv/config";
import {Sequelize} from "sequelize";

const sequelize_db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.SEQUELIZE_DATABASE_DIALECT,
  timezone: process.env.TIMEZONE,
  dialectOption: {
    useUTC: false
  }
});

export default sequelize_db;
