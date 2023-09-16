"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flipbox = void 0;
const sequelize_1 = require("sequelize");
const Flipbox = (sequelize, Sequelize) => {
    const Flipbox = sequelize.define("flipbox", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    return Flipbox;
};
exports.Flipbox = Flipbox;
