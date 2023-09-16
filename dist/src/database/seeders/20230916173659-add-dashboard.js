"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("dashboards", list_data_1.DASHBOARDS, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("dashboards", {});
    },
};
module.exports = migration;
