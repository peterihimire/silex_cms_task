"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { LOGOS } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert("logos", LOGOS, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("logos", {});
  },
};

export = migration;
