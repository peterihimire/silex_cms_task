"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Menu extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Menu.hasMany(models.SubMenu, {
                as: "submenus",
                foreignKey: "menuId",
                onDelete: "CASCADE",
                hooks: true,
            });
            Menu.belongsTo(models.Dashboard, {
                as: "dashboard",
                foreignKey: "dashboardId",
            });
        }
    }
    Menu.init({
        title: DataTypes.STRING,
        link: DataTypes.STRING,
        slug: DataTypes.STRING,
        has_sub_menu: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Menu",
        tableName: "menus",
    });
    return Menu;
};
