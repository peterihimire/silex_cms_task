"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logo_controller_1 = require("../controllers/logo-controller");
const router = (0, express_1.Router)();
router.post("/create", logo_controller_1.create_logo);
exports.default = router;
