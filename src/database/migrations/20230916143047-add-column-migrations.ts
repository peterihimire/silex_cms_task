"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "submenus",
        "menuId",
        {
          type: DataTypes.INTEGER,
          references: { model: "menus", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "flipboxes",
        "dashboardId",
        {
          type: DataTypes.INTEGER,
          references: { model: "dashboards", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "menus",
        "dashboardId",
        {
          type: DataTypes.INTEGER,
          references: { model: "dashboards", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "logos",
        "dashboardId",
        {
          type: DataTypes.INTEGER,
          references: { model: "dashboards", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction }
      );

      await queryInterface.addColumn(
        "sliders",
        "dashboardId",
        {
          type: DataTypes.INTEGER,
          references: { model: "dashboards", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
      await queryInterface.removeColumn("submenus", "menuId", {
        transaction,
      });
      await queryInterface.removeColumn("flipboxes", "dashboardId", {
        transaction,
      });

      await queryInterface.removeColumn("menus", "dashboardId", {
        transaction,
      });

      await queryInterface.removeColumn("logos", "dashboardId", {
        transaction,
      });

      await queryInterface.removeColumn("sliders", "dashboardId", {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
};
