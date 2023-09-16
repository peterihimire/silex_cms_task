"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard-controller");
const router = (0, express_1.Router)();
router.post("/create", dashboard_controller_1.create_dashboard);
router.get("/get_dashboard/:dash_id", dashboard_controller_1.get_dashboard);
exports.default = router;
