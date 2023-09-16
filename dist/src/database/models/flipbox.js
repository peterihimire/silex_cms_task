"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Flipbox extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Flipbox.belongsToMany(models.Category, {
                as: "categories",
                foreignKey: "flipboxId",
                through: "flipbox_categories",
                onDelete: "CASCADE",
            });
            Flipbox.belongsTo(models.Dashboard, {
                as: "dashboard",
                foreignKey: "dashboardId",
            });
        }
    }
    Flipbox.init({
        title: DataTypes.STRING,
        desc: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Flipbox",
        tableName: "flipboxes",
    });
    return Flipbox;
};
