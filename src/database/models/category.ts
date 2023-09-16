"use strict";
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface CategoryAttributes {
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Category
    extends Model<CategoryAttributes>
    implements CategoryAttributes
  {
    name!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Category.belongsToMany(models.Flipbox, {
        as: "flipboxes",
        foreignKey: "categoryId",
        through: "flipbox_categories",
        onDelete: "CASCADE",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
    }
  );
  return Category;
};
