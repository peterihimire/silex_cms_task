"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLIPBOX_CATEGORIES = exports.FLIPBOXES = exports.SLIDERS = exports.MENUS = exports.LOGOS = exports.CATEGORIES = exports.DASHBOARDS = exports.CHARLIST = void 0;
exports.CHARLIST = "0123456789"; // "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// module.exports = { CHARLIST };
exports.DASHBOARDS = [
    {
        name: "Dashboard One",
        dash_id: "6de26966-0f0b-41f0-8fdb-79772aff1133",
    },
];
exports.CATEGORIES = [
    {
        name: "news",
    },
    {
        name: "products",
    },
    {
        name: "politics",
    },
    {
        name: "school",
    },
];
exports.LOGOS = [
    {
        name: "Deliotte logo",
        width: "100px",
        height: "100px",
        position: "left",
        img_url: "images/deliotte-2023-09-17T09:32:43.075Z.svg",
        dashboardId: 1,
    },
];
exports.MENUS = [
    {
        link: "/homepage",
        title: "Homepage",
        slug: "home-page",
        has_sub_menu: false,
        dashboardId: 1,
    },
];
exports.SLIDERS = [
    {
        width: "100vw",
        height: "900vh",
        title: "Classic shoe wears",
        sub_title: "This is the subtitle to this running shoes in questions, yeah thats it.",
        dashboardId: 1,
    },
];
exports.FLIPBOXES = [
    {
        desc: "This is the flipbox content that is a lot more detailed.",
        title: "Politicians",
        dashboardId: 1,
    },
];
exports.FLIPBOX_CATEGORIES = [
    {
        flipboxId: 1,
        categoryId: 1,
    },
    {
        flipboxId: 1,
        categoryId: 2,
    },
];
