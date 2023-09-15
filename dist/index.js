"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./src/models"));
const app_1 = __importDefault(require("./app"));
const User = models_1.default.users;
const Dashboard = models_1.default.dashboards;
const Logo = models_1.default.logos;
const Flipbox = models_1.default.flipboxs;
const Menu = models_1.default.menus;
const Slider = models_1.default.sliders;
const PORT = 4040;
const HOST = "0.0.0.0";
Dashboard.hasMany(Menu, {
    onDelete: "CASCADE",
    hooks: true,
});
Menu.belongsTo(Dashboard);
Dashboard.hasMany(Flipbox, {
    onDelete: "CASCADE",
    hooks: true,
});
Flipbox.belongsTo(Dashboard);
Dashboard.hasOne(Logo, {
    onDelete: "CASCADE",
    hooks: true,
});
Logo.belongsTo(Dashboard);
Dashboard.hasOne(Slider, {
    onDelete: "CASCADE",
    hooks: true,
});
Slider.belongsTo(Dashboard);
app_1.default.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
const connectWithRetry = () => {
    models_1.default.sequelize
        .sync()
        // .sync({ force: true })
        .then(() => console.log("PostgreSQL connection was successful..."))
        .catch((e) => {
        console.log("Failed to sync db: " + e.message);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
