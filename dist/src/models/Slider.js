"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const sequelize_1 = require("sequelize");
const Slider = (sequelize, Sequelize) => {
    const Slider = sequelize.define("slider", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        width: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        height: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        sub_title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    return Slider;
};
exports.Slider = Slider;
