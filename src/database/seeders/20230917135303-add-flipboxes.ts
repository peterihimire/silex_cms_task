"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { FLIPBOXES } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert("flipboxes", FLIPBOXES, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("flipboxes", {});
  },
};

export = migration;
