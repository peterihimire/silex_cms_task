"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Slider extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Slider.belongsTo(models.Dashboard, {
                as: "dashboard",
                foreignKey: "dashboardId",
            });
        }
    }
    Slider.init({
        width: DataTypes.STRING,
        height: DataTypes.STRING,
        title: DataTypes.STRING,
        sub_title: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Slider",
        tableName: "sliders",
    });
    return Slider;
};
