"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FlipboxCategory extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    FlipboxCategory.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "FlipboxCategory",
        tableName: "fliboxcategories",
    });
    return FlipboxCategory;
};
