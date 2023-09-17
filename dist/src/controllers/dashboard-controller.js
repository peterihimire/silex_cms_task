"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_dashboard = exports.create_dashboard = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Dashboard = models_1.default.Dashboard;
const Flipbox = models_1.default.Flipbox;
const Logo = models_1.default.Logo;
const Menu = models_1.default.Menu;
const Slider = models_1.default.Slider;
const Category = models_1.default.Category;
const SubMenu = models_1.default.SubMenu;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_dashboard = async (req, res, next) => {
    const { name } = req.body;
    console.log("thia is ...", Dashboard);
    try {
        console.log("This is ...", Dashboard);
        const foundDashboard = await Dashboard.findOne({
            attributes: ["name"],
            where: { name: name },
        });
        if (foundDashboard) {
            return next(new base_error_1.default("Dashboard name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW ACCOUNT
        const createdDashboard = await Dashboard.create({
            name: name,
        });
        const { id, createdAt, updatedAt, ...others } = createdDashboard.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Dashboard created!.",
            data: { ...others },
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.create_dashboard = create_dashboard;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_dashboard = async (req, res, next) => {
    const { dash_id } = req.params;
    console.log("thia is ...", Dashboard);
    try {
        console.log("This is ...", Dashboard);
        const foundDashboard = await Dashboard.findOne({
            attributes: ["dash_id"],
            where: { dash_id: dash_id },
            include: [
                {
                    model: Flipbox,
                    as: "flipboxes",
                    include: [
                        {
                            model: Category,
                            as: "categories",
                            through: {
                                attributes: [],
                            },
                        },
                    ],
                },
                { model: Logo, as: "logos" },
                {
                    model: Menu,
                    as: "menus",
                    include: [
                        {
                            model: SubMenu,
                            as: "submenus",
                        },
                    ],
                },
                { model: Slider, as: "sliders" },
            ],
        });
        if (!foundDashboard) {
            return next(new base_error_1.default("Dashboard does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Dashboard info!.",
            data: foundDashboard,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_dashboard = get_dashboard;
