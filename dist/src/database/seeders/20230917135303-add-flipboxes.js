"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("flipboxes", list_data_1.FLIPBOXES, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("flipboxes", {});
    },
};
module.exports = migration;
