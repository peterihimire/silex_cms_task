"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flipbox_controller_1 = require("../controllers/flipbox-controller");
const router = (0, express_1.Router)();
router.post("/create", flipbox_controller_1.create_flipbox);
exports.default = router;
