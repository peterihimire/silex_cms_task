import { Sequelize, Model, DataTypes } from "sequelize";

interface SliderAttributes {
  id: number;
  width: string;
  height: string;
  title: string;
  sub_title: string;
}

interface SliderModel extends Model<SliderAttributes>, SliderAttributes {}

export const Slider = (sequelize: Sequelize, Sequelize: any) => {
  const Slider = sequelize.define<SliderModel>("slider", {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Slider;
};
