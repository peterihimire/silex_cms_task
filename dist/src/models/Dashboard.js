"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const sequelize_1 = require("sequelize");
const Dashboard = (sequelize, Sequelize) => {
    const Dashboard = sequelize.define("dashboard", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        dash_id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    });
    return Dashboard;
};
exports.Dashboard = Dashboard;
// import { Sequelize, DataTypes } from "sequelize";
// export const Dashboard = (sequelize: Sequelize, Sequelize: any) => {
//   const Dashboard = sequelize.define("dashboard", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     dash_id: {
//       type: DataTypes.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       allowNull: false,
//       unique: true,
//     },
//   });
//   return Dashboard;
// };
