"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import db from "./src/models";
const index_1 = __importDefault(require("./src/database/models/index"));
const app_1 = __importDefault(require("./app"));
// const User = db.users;
// const Dashboard = db.dashboards;
// const Logo = db.logos;
// const Flipbox = db.flipboxes;
// const Menu = db.menus;
// const Slider = db.sliders;
const PORT = 4040;
const HOST = "0.0.0.0";
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
app_1.default.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
const connectWithRetry = () => {
    index_1.default.sequelize
        .sync()
        // .sync({ force: true })
        .then(() => console.log("PostgreSQL connection was successful..."))
        .catch((e) => {
        console.log("Failed to sync db: " + e.message);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
