"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { FLIPBOX_CATEGORIES } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert(
      "flipbox_categories",
      FLIPBOX_CATEGORIES,
      {}
    );
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("flipbox_categories", {});
  },
};

export = migration;
