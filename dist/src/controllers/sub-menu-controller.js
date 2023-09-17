"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_sub_menu = exports.update_sub_menu = exports.get_all_sub_menus = exports.get_sub_menu = exports.create_sub_menu = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
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
        // CREATE NEW SUB-MENU
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
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_sub_menu = async (req, res, next) => {
    const { sm_id } = req.params;
    try {
        console.log("This is ...", SubMenu);
        const foundSubMenu = await SubMenu.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: sm_id },
        });
        if (!foundSubMenu) {
            return next(new base_error_1.default("SubMenu does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "SubMenu info!.",
            data: foundSubMenu,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_sub_menu = get_sub_menu;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_all_sub_menus = async (req, res, next) => {
    try {
        console.log("This is ...", SubMenu);
        const foundSubMenus = await SubMenu.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (!foundSubMenus) {
            return next(new base_error_1.default("Menus does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "All sub-menus!.",
            data: foundSubMenus,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_all_sub_menus = get_all_sub_menus;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const update_sub_menu = async (req, res, next) => {
    const { slug, link, title } = req.body;
    const { sm_id } = req.params;
    try {
        console.log("This is ...", SubMenu);
        const foundSubMenu = await SubMenu.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: sm_id },
        });
        if (!foundSubMenu) {
            return next(new base_error_1.default("SubMenu does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const updatedSubMenu = await foundSubMenu;
        updatedSubMenu.title = title;
        updatedSubMenu.link = link;
        updatedSubMenu.slug = slug;
        updatedSubMenu.save();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "SubMenu updated!.",
            data: updatedSubMenu,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.update_sub_menu = update_sub_menu;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const delete_sub_menu = async (req, res, next) => {
    const { sm_id } = req.params;
    try {
        console.log("This is ...", SubMenu);
        const foundSubMenu = await SubMenu.findOne({
            where: { id: sm_id },
        });
        if (!foundSubMenu) {
            return next(new base_error_1.default("SubMenu does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        await foundSubMenu.destroy();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "SubMenu deleted!.",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.delete_sub_menu = delete_sub_menu;
