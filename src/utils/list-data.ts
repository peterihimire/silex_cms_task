export const CHARLIST = "0123456789"; // "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// module.exports = { CHARLIST };
export const DASHBOARDS = [
  {
    name: "Dashboard One",
    dash_id: "6de26966-0f0b-41f0-8fdb-79772aff1133",
  },
];

export const CATEGORIES = [
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

export const LOGOS = [
  {
    name: "Deliotte logo",
    width: "100px",
    height: "100px",
    position: "left",
    img_url: "images/deliotte-2023-09-17T09:32:43.075Z.svg",
    dashboardId: 1,
  },
];

export const MENUS = [
  {
    link: "/homepage",
    title: "Homepage",
    slug: "home-page",
    has_sub_menu: false,
    dashboardId: 1,
  },
];

export const SLIDERS = [
  {
    width: "100vw",
    height: "900vh",
    title: "Classic shoe wears",
    sub_title:
      "This is the subtitle to this running shoes in questions, yeah thats it.",
    dashboardId: 1,
  },
];

export const FLIPBOXES = [
  {
    desc: "This is the flipbox content that is a lot more detailed.",
    title: "Politicians",
    dashboardId: 1,
  },
];

export const FLIPBOX_CATEGORIES = [
  {
    flipboxId: 1,
    categoryId: 1,
  },
  {
    flipboxId: 1,
    categoryId: 2,
  },
];
