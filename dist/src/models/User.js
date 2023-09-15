"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const User = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        uuid: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
        },
        acct_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    return User;
};
exports.User = User;
