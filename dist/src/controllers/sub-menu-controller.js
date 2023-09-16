"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_sub_menu = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SubMenu = models_1.default.SubMenu;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_sub_menu = async (req, res, next) => {
    const { menu_id, slug, link, title } = req.body;
    try {
        console.log("This is ...", SubMenu);
        const foundSubMenu = await SubMenu.findOne({
            attributes: ["title"],
            where: { title: title },
        });
        if (foundSubMenu) {
            return next(new base_error_1.default("Sub-menu title already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW MENU
        const createdSubMenu = await SubMenu.create({
            title: title,
            link: link,
            slug: slug,
            menuId: menu_id,
        });
        const { id, ...others } = createdSubMenu.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Sub-menu created!.",
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
exports.create_sub_menu = create_sub_menu;
