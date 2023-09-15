import dbConfig from "../config/config";
import { Sequelize, Options } from "sequelize";
import { User } from "./User";
import { Dashboard } from "./Dashboard";
import { Flipbox } from "./Flipbox";
import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { Slider } from "./Slider";

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

// Define the User and Dashboard models
const UserModel = User(sequelize, Sequelize);
const DashboardModel = Dashboard(sequelize, Sequelize);

interface Database {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  users: any; // This should be defined properly based on User model.
  dashboards: any;
  flipboxs: any;
  logos: any;
  menus: any;
  sliders: any;
  // users: typeof UserModel; // This should be defined properly based on User model.
  // dashboards: typeof DashboardModel;
}

const db: Database = {
  Sequelize,
  sequelize,
  users: User(sequelize, Sequelize),
  dashboards: Dashboard(sequelize, Sequelize),
  flipboxs: Flipbox(sequelize, Sequelize),
  logos: Logo(sequelize, Sequelize),
  menus: Menu(sequelize, Sequelize),
  sliders: Slider(sequelize, Sequelize),
  // users: UserModel,
  // dashboards: DashboardModel,
};

export default db;
