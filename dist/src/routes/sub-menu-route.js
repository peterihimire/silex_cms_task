"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sub_menu_controller_1 = require("../controllers/sub-menu-controller");
const router = (0, express_1.Router)();
router.post("/create", sub_menu_controller_1.create_sub_menu);
router.get("/get_sub-menu/:sm_id", sub_menu_controller_1.get_sub_menu);
router.get("/get_all_sub-menus", sub_menu_controller_1.get_all_sub_menus);
router.patch("/update/:sm_id", sub_menu_controller_1.update_sub_menu);
router.delete("/delete/:sm_id", sub_menu_controller_1.delete_sub_menu);
exports.default = router;
