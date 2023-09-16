"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const sequelize_1 = require("sequelize");
const Logo = (sequelize, Sequelize) => {
    const Logo = sequelize.define("logo", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        width: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        height: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        img_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    return Logo;
};
exports.Logo = Logo;
