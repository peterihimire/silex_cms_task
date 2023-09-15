import dbConfig from "../config/config";
import { Sequelize, Options } from "sequelize";
import { User } from "./User";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

interface Database {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  users: any; // This should be defined properly based on User model.
}

const db: Database = {
  Sequelize,
  sequelize,
  users: User(sequelize, Sequelize),
};

export default db;
