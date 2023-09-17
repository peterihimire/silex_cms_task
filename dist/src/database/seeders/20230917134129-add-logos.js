"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("logos", list_data_1.LOGOS, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("logos", {});
    },
};
module.exports = migration;
