"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("flipbox_categories", list_data_1.FLIPBOX_CATEGORIES, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("flipbox_categories", {});
    },
};
module.exports = migration;
