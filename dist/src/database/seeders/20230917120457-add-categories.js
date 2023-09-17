"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("categories", list_data_1.CATEGORIES, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("categories", {});
    },
};
module.exports = migration;
