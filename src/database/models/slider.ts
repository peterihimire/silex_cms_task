"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface SliderAttributes {
  width: string;
  height: string;
  title: string;
  sub_title: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Slider extends Model<SliderAttributes> implements SliderAttributes {
    width!: string;
    height!: string;
    title!: string;
    sub_title!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
       Slider.belongsTo(models.Dashboard, {
         as: "dashboard",
         foreignKey: "dashboardId",
       });
    }
  }
  Slider.init(
    {
      width: DataTypes.STRING,
      height: DataTypes.STRING,
      title: DataTypes.STRING,
      sub_title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Slider",
      tableName: "sliders",
    }
  );
  return Slider;
};
