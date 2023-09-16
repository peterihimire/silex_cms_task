"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category-controller");
const router = (0, express_1.Router)();
router.post("/create", category_controller_1.create_category);
exports.default = router;
