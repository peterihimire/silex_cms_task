// import db from "./src/models";
import db from "./src/database/models/index";
import app from "./app";

// const User = db.users;
// const Dashboard = db.dashboards;
// const Logo = db.logos;
// const Flipbox = db.flipboxes;
// const Menu = db.menus;
// const Slider = db.sliders;

const PORT: number = 4040;
const HOST: string = "0.0.0.0";

// Dashboard.hasMany(Flipbox, {
//   onDelete: "CASCADE",
//   hooks: true,
// });
// Flipbox.belongsTo(Dashboard);

// Dashboard.hasMany(Menu, {
//   onDelete: "CASCADE",
//   hooks: true,
// });
// Menu.belongsTo(Dashboard);

// Dashboard.hasMany(Logo, {
//   onDelete: "CASCADE",
//   hooks: true,
// });
// Logo.belongsTo(Dashboard);

// Dashboard.hasMany(Slider, {
//   onDelete: "CASCADE",
//   hooks: true,
// });
// Slider.belongsTo(Dashboard);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

const connectWithRetry = (): void => {
  db.sequelize
    .sync()
    // .sync({ force: true })
    .then(() => console.log("PostgreSQL connection was successful..."))
    .catch((e: any) => {
      console.log("Failed to sync db: " + e.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
