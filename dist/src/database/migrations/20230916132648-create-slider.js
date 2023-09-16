"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        // here go all migration changes
        await queryInterface.createTable("sliders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
            },
            sub_title: {
                type: sequelize_1.DataTypes.STRING,
            },
            width: {
                type: sequelize_1.DataTypes.STRING,
            },
            height: {
                type: sequelize_1.DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                defaultValue: new Date(),
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                defaultValue: new Date(),
                type: sequelize_1.DataTypes.DATE,
            },
        });
    }),
    down: (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        // here go all migration undo changes
        await queryInterface.dropTable("sliders");
    }),
};
