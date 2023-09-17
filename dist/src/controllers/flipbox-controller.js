"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_flipbox = exports.update_flipbox = exports.get_all_flipboxes = exports.get_flipbox = exports.create_flipbox = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
const models_1 = __importDefault(require("../database/models"));
const Op = models_1.default.Sequelize.Op;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Flipbox = models_1.default.Flipbox;
const Category = models_1.default.Category;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_flipbox = async (req, res, next) => {
    const { dash_id, desc, title } = req.body;
    const available_categories = req.body.categories;
    console.log(available_categories);
    try {
        console.log("This is ...", Flipbox);
        const foundFlipbox = await Flipbox.findOne({
            attributes: ["title"],
            where: { title: title },
        });
        if (foundFlipbox) {
            return next(new base_error_1.default("Flipbox name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        if (!available_categories) {
            return next(new base_error_1.default(`Category(s) not selected.`, http_status_codes_1.httpStatusCodes.BAD_REQUEST));
        }
        // CREATE NEW FLIPBOX
        const createdFlipbox = await Flipbox.create({
            desc: desc,
            title: title,
            dashboardId: dash_id,
        });
        const categories = [];
        // FOR SELECTED COUNTRIES
        if (available_categories) {
            const country_service = await Category.findAll({
                where: {
                    name: {
                        [Op.or]: available_categories,
                    },
                },
            });
            await createdFlipbox.setCategories(country_service);
        }
        const f_categories = await createdFlipbox.getCategories();
        for (let i = 0; i < f_categories.length; i++) {
            categories.push(f_categories[i].name.toUpperCase());
        }
        const { id, ...others } = createdFlipbox.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Flipbox created!.",
            data: { ...others, categories },
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.create_flipbox = create_flipbox;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_flipbox = async (req, res, next) => {
    const { f_id } = req.params;
    try {
        console.log("This is ...", Flipbox);
        const foundFlipbox = await Flipbox.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: f_id },
            include: [
                {
                    model: Category,
                    as: "categories",
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!foundFlipbox) {
            return next(new base_error_1.default("Flipbox does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Flipbox info!.",
            data: foundFlipbox,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_flipbox = get_flipbox;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_all_flipboxes = async (req, res, next) => {
    try {
        console.log("This is ...", Flipbox);
        const foundFlipboxes = await Flipbox.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Category,
                    as: "categories",
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!foundFlipboxes) {
            return next(new base_error_1.default("Menus does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "All menus!.",
            data: foundFlipboxes,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_all_flipboxes = get_all_flipboxes;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const update_flipbox = async (req, res, next) => {
    const { desc, title } = req.body;
    const available_categories = req.body.categories;
    console.log(available_categories);
    const { f_id } = req.params;
    try {
        console.log("This is ...", Flipbox);
        const foundFlipbox = await Flipbox.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: f_id },
            include: [
                {
                    model: Category,
                    as: "categories",
                },
            ],
        });
        if (!foundFlipbox) {
            return next(new base_error_1.default("Flipbox does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const updatedFlipbox = await foundFlipbox;
        updatedFlipbox.title = title;
        updatedFlipbox.desc = desc;
        updatedFlipbox.save();
        const categories = [];
        // FOR SELECTED COUNTRIES
        if (available_categories) {
            const country_service = await Category.findAll({
                where: {
                    name: {
                        [Op.or]: available_categories,
                    },
                },
            });
            await updatedFlipbox.setCategories(country_service);
        }
        const f_categories = await updatedFlipbox.getCategories();
        for (let i = 0; i < f_categories.length; i++) {
            categories.push(f_categories[i].name.toUpperCase());
        }
        const { id, ...others } = updatedFlipbox.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Flipbox updated!.",
            data: { ...others, categories },
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.update_flipbox = update_flipbox;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const delete_flipbox = async (req, res, next) => {
    const { f_id } = req.params;
    try {
        console.log("This is ...", Flipbox);
        const foundFlipbox = await Flipbox.findOne({
            where: { id: f_id },
        });
        if (!foundFlipbox) {
            return next(new base_error_1.default("Flipbox does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        await foundFlipbox.destroy();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Flipbox deleted!.",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.delete_flipbox = delete_flipbox;
