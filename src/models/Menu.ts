import { Sequelize, Model, DataTypes } from "sequelize";

interface MenuAttributes {
  id: number;
  title: string;
  link: string;
  has_sub_menu: string;
}

interface MenuModel extends Model<MenuAttributes>, MenuAttributes {}

export const Menu = (sequelize: Sequelize, Sequelize: any) => {
  const Menu = sequelize.define<MenuModel>("menu", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    has_sub_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Menu;
};
