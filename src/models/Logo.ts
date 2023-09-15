import { Sequelize, Model, DataTypes } from "sequelize";

interface LogoAttributes {
  id: number;
  width: string;
  height: string;
  img_url: string;
}

interface UserModel extends Model<LogoAttributes>, LogoAttributes {}

export const Logo = (sequelize: Sequelize, Sequelize: any) => {
  const Logo = sequelize.define<UserModel>("logo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    width: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Logo;
};
