"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_menu = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Menu = models_1.default.menus;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_menu = async (req, res, next) => {
    const { dash_id, has_sub_menu, slug, link, title } = req.body;
    try {
        console.log("This is ...", Menu);
        const foundMenu = await Menu.findOne({
            attributes: ["title"],
            where: { title: title },
        });
        if (foundMenu) {
            return next(new base_error_1.default("Menu title already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW MENU
        const createdMenu = await Menu.create({
            title: title,
            link: link,
            slug: slug,
            has_sub_menu: has_sub_menu,
            dashboardId: dash_id,
        });
        const { id, password, ...others } = createdMenu.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Menu created!.",
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
exports.create_menu = create_menu;
