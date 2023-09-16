"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const sequelize_1 = require("sequelize");
const Menu = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
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
        link: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        has_sub_menu: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return Menu;
};
exports.Menu = Menu;
