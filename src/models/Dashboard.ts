import { Sequelize, Model, DataTypes } from "sequelize";

interface DashboardAttributes {
  id: number;
  dash_id: string;
}

interface UserModel extends Model<DashboardAttributes>, DashboardAttributes {}

export const Dashboard = (sequelize: Sequelize, Sequelize: any) => {
  const Dashboard = sequelize.define<UserModel>("dashboard", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    dash_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
  });

  return Dashboard;
};

// import { Sequelize, DataTypes } from "sequelize";

// export const Dashboard = (sequelize: Sequelize, Sequelize: any) => {
//   const Dashboard = sequelize.define("dashboard", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     dash_id: {
//       type: DataTypes.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       allowNull: false,
//       unique: true,
//     },
//   });

//   return Dashboard;
// };
