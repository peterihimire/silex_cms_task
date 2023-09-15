import { Sequelize, Model, DataTypes } from "sequelize";

interface UserAttributes {
  id: number;
  acct_id: string;
  email: string;
  password: string;
}

interface UserModel extends Model<UserAttributes>, UserAttributes {}

export const User = (sequelize: Sequelize, Sequelize: any) => {
  const User = sequelize.define<UserModel>("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    acct_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
