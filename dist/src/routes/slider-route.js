"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slider_controller_1 = require("../controllers/slider-controller");
const router = (0, express_1.Router)();
router.post("/create", slider_controller_1.create_slider);
exports.default = router;
