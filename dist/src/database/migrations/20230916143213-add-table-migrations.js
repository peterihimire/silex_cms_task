"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable("flipbox_categories", {
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                flipboxId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                },
                categoryId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                },
            }, { transaction });
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    },
    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable("flipbox_categories", { transaction });
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    },
};
