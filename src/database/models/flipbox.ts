"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface FlipboxAttributes {
  title: string;
  desc: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Flipbox extends Model<FlipboxAttributes> implements FlipboxAttributes {
    title!: string;
    desc!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
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
  Flipbox.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Flipbox",
      tableName: "flipboxes",
    }
  );
  return Flipbox;
};
