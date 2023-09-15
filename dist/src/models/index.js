"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const Dashboard_1 = require("./Dashboard");
const Flipbox_1 = require("./Flipbox");
const Logo_1 = require("./Logo");
const Menu_1 = require("./Menu");
const Slider_1 = require("./Slider");
const sequelize = new sequelize_1.Sequelize(config_1.default.DB, config_1.default.USER, config_1.default.PASSWORD, {
    host: config_1.default.HOST,
    dialect: config_1.default.dialect,
    // operatorsAliases: false,
    pool: {
        max: config_1.default.pool.max,
        min: config_1.default.pool.min,
        acquire: config_1.default.pool.acquire,
        idle: config_1.default.pool.idle,
    },
});
// Define the User and Dashboard models
const UserModel = (0, User_1.User)(sequelize, sequelize_1.Sequelize);
const DashboardModel = (0, Dashboard_1.Dashboard)(sequelize, sequelize_1.Sequelize);
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize,
    users: (0, User_1.User)(sequelize, sequelize_1.Sequelize),
    dashboards: (0, Dashboard_1.Dashboard)(sequelize, sequelize_1.Sequelize),
    flipboxs: (0, Flipbox_1.Flipbox)(sequelize, sequelize_1.Sequelize),
    logos: (0, Logo_1.Logo)(sequelize, sequelize_1.Sequelize),
    menus: (0, Menu_1.Menu)(sequelize, sequelize_1.Sequelize),
    sliders: (0, Slider_1.Slider)(sequelize, sequelize_1.Sequelize),
    // users: UserModel,
    // dashboards: DashboardModel,
};
exports.default = db;
