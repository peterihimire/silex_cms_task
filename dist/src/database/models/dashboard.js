"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Dashboard extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Dashboard.hasMany(models.Flipbox, {
                as: "flipboxes",
                foreignKey: "dashboardId",
                onDelete: "CASCADE",
                hooks: true,
            });
            Dashboard.hasMany(models.Menu, {
                as: "menus",
                foreignKey: "dashboardId",
                onDelete: "CASCADE",
                hooks: true,
            });
            Dashboard.hasMany(models.Logo, {
                as: "logos",
                foreignKey: "dashboardId",
                onDelete: "CASCADE",
                hooks: true,
            });
            Dashboard.hasMany(models.Slider, {
                as: "sliders",
                foreignKey: "dashboardId",
                onDelete: "CASCADE",
                hooks: true,
            });
        }
    }
    Dashboard.init({
        dash_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Dashboard",
        tableName: "dashboards",
    });
    return Dashboard;
};
