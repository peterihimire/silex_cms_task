"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_menu = exports.update_menu = exports.get_all_menus = exports.get_menu = exports.create_menu = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Menu = models_1.default.Menu;
const SubMenu = models_1.default.SubMenu;
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
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_menu = async (req, res, next) => {
    const { m_id } = req.params;
    try {
        console.log("This is ...", Menu);
        const foundMenu = await Menu.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: m_id },
            include: [
                {
                    model: SubMenu,
                    as: "submenus",
                },
            ],
        });
        if (!foundMenu) {
            return next(new base_error_1.default("Menu does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Menu info!.",
            data: foundMenu,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_menu = get_menu;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_all_menus = async (req, res, next) => {
    try {
        console.log("This is ...", Menu);
        const foundMenus = await Menu.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: SubMenu,
                    as: "submenus",
                },
            ],
        });
        if (!foundMenus) {
            return next(new base_error_1.default("Menus does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "All menus!.",
            data: foundMenus,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_all_menus = get_all_menus;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const update_menu = async (req, res, next) => {
    const { has_sub_menu, slug, link, title } = req.body;
    console.log(has_sub_menu, "This is the contnt sub-menu");
    const { m_id } = req.params;
    try {
        console.log("This is ...", Menu);
        const foundMenu = await Menu.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: m_id },
            include: [
                {
                    model: SubMenu,
                    as: "submenus",
                },
            ],
        });
        if (!foundMenu) {
            return next(new base_error_1.default("Menu does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const updatedMenu = await foundMenu;
        updatedMenu.title = title;
        updatedMenu.link = link;
        updatedMenu.has_sub_menu = has_sub_menu;
        updatedMenu.slug = slug;
        updatedMenu.save();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Menu updated!.",
            data: updatedMenu,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.update_menu = update_menu;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const delete_menu = async (req, res, next) => {
    const { m_id } = req.params;
    try {
        console.log("This is ...", Menu);
        const foundMenu = await Menu.findOne({
            where: { id: m_id },
        });
        if (!foundMenu) {
            return next(new base_error_1.default("Menu does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        await foundMenu.destroy();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Menu deleted!.",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.delete_menu = delete_menu;
