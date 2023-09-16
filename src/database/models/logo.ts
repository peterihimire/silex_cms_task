"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface LogoAttributes {
  name: string;
  width: string;
  height: string;
  img_url: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Logo extends Model<LogoAttributes> implements LogoAttributes {
    name!: string;
    width!: string;
    height!: string;
    img_url!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
       Logo.belongsTo(models.Dashboard, {
         as: "dashboard",
         foreignKey: "dashboardId",
       });
    }
  }
  Logo.init(
    {
      name: DataTypes.STRING,
      width: DataTypes.STRING,
      height: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Logo",
      tableName: "logos",
    }
  );
  return Logo;
};
