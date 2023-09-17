"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { CATEGORIES } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert("categories", CATEGORIES, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("categories", {});
  },
};

export = migration;
