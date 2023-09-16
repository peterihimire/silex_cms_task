"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface SubMenuAttributes {
  title: string;
  link: string;
  slug: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class SubMenu extends Model<SubMenuAttributes> implements SubMenuAttributes {
    title!: string;
    link!: string;
    slug!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      SubMenu.belongsTo(models.Menu, {
        as: "menu",
        foreignKey: "menuId",
      });
    }
  }

  SubMenu.init(
    {
      title: DataTypes.STRING,
      link: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SubMenu",
      tableName: "submenus",
    }
  );
  return SubMenu;
};
