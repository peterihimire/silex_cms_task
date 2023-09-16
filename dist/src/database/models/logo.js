"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Logo extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Logo.belongsTo(models.Dashboard, {
                as: "dashboard",
                foreignKey: "dashboardId",
            });
        }
    }
    Logo.init({
        name: DataTypes.STRING,
        width: DataTypes.STRING,
        height: DataTypes.STRING,
        img_url: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Logo",
        tableName: "logos",
    });
    return Logo;
};
