"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sub_menu_controller_1 = require("../controllers/sub-menu-controller");
const router = (0, express_1.Router)();
router.post("/create", sub_menu_controller_1.create_sub_menu);
exports.default = router;
