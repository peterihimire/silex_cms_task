"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface MenuAttributes {
  title: string;
  link: string;
  slug: string;
  has_sub_menu: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Menu extends Model<MenuAttributes> implements MenuAttributes {
    title!: string;
    link!: string;
    slug!: string;
    has_sub_menu!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
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
  Menu.init(
    {
      title: DataTypes.STRING,
      link: DataTypes.STRING,
      slug: DataTypes.STRING,
      has_sub_menu: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Menu",
      tableName: "menus",
    }
  );
  return Menu;
};
