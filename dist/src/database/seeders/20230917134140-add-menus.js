"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("menus", list_data_1.MENUS, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("menus", {});
    },
};
module.exports = migration;
