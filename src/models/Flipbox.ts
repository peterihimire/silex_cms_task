import { Sequelize, Model, DataTypes } from "sequelize";

interface FlipboxAttributes {
  id: number;
  title: string;
  desc: string;
}

interface UserModel extends Model<FlipboxAttributes>, FlipboxAttributes {}

export const Flipbox = (sequelize: Sequelize, Sequelize: any) => {
  const Flipbox = sequelize.define<UserModel>("flipbox", {
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
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Flipbox;
};
