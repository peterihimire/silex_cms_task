"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "flipbox_categories",
        {
          createdAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: DataTypes.DATE,
          },
          flipboxId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("flipbox_categories", { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
};
