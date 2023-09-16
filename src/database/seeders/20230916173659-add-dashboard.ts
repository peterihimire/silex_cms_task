"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { DASHBOARDS } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert("dashboards", DASHBOARDS, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("dashboards", {});
  },
};

export = migration;
