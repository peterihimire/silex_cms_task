"use strict";
const list_data_1 = require("../../utils/list-data");
const migration = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("sliders", list_data_1.SLIDERS, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("sliders", {});
    },
};
module.exports = migration;
