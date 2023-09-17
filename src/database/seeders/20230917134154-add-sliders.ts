"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { SLIDERS } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert("sliders", SLIDERS, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("sliders", {});
  },
};

export = migration;
