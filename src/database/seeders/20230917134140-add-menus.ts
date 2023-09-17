"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import { MENUS } from "../../utils/list-data";

const migration = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkInsert("menus", MENUS, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.bulkDelete("menus", {});
  },
};

export = migration;
