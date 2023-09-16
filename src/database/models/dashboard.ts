"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface DashboardAttributes {
  dash_id: string;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Dashboard
    extends Model<DashboardAttributes>
    implements DashboardAttributes
  {
    dash_id!: string;
    name!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
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
  Dashboard.init(
    {
      dash_id: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Dashboard",
      tableName: "dashboards",
    }
  );
  return Dashboard;
};
