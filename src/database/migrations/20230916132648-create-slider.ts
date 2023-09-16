"use strict";

import { QueryInterface, DataTypes, QueryTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration changes
      await queryInterface.createTable("sliders", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        title: {
          type: DataTypes.STRING,
        },
        sub_title: {
          type: DataTypes.STRING,
        },
        width: {
          type: DataTypes.STRING,
        },
        height: {
          type: DataTypes.STRING,
        },
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
      });
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      await queryInterface.dropTable("sliders");
    }),
};
