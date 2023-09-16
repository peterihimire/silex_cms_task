"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SubMenu extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SubMenu.belongsTo(models.Menu, {
                as: "menu",
                foreignKey: "menuId",
            });
        }
    }
    SubMenu.init({
        title: DataTypes.STRING,
        link: DataTypes.STRING,
        slug: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "SubMenu",
        tableName: "submenus",
    });
    return SubMenu;
};
