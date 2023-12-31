"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_category = exports.update_category = exports.get_all_categories = exports.get_category = exports.create_category = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Category = models_1.default.Category;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_category = async (req, res, next) => {
    const { name } = req.body;
    try {
        console.log("This is ...", Category);
        const foundCategory = await Category.findOne({
            attributes: ["name"],
            where: { name: name },
        });
        if (foundCategory) {
            return next(new base_error_1.default("Category name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW CATEGORY
        const createdCategory = await Category.create({
            name: name,
        });
        const { id, ...others } = createdCategory.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Category created!.",
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
exports.create_category = create_category;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_category = async (req, res, next) => {
    const { cat_id } = req.params;
    try {
        console.log("This is ...", Category);
        const foundCategory = await Category.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: cat_id },
        });
        if (!foundCategory) {
            return next(new base_error_1.default("Category does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Category info!.",
            data: foundCategory,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_category = get_category;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_all_categories = async (req, res, next) => {
    try {
        console.log("This is ...", Category);
        const foundCategories = await Category.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (!foundCategories) {
            return next(new base_error_1.default("Categories does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "All categories!.",
            data: foundCategories,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_all_categories = get_all_categories;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const update_category = async (req, res, next) => {
    const { name } = req.body;
    const { cat_id } = req.params;
    try {
        console.log("This is ...", Category);
        const foundCategory = await Category.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: cat_id },
        });
        if (!foundCategory) {
            return next(new base_error_1.default("Category does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const updatedCategory = await foundCategory;
        updatedCategory.name = name;
        updatedCategory.save();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Category updated!.",
            data: updatedCategory,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.update_category = update_category;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const delete_category = async (req, res, next) => {
    const { cat_id } = req.params;
    try {
        console.log("This is ...", Category);
        const foundCategory = await Category.findOne({
            where: { id: cat_id },
        });
        if (!foundCategory) {
            return next(new base_error_1.default("Category does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        await foundCategory.destroy();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Category deleted!.",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.delete_category = delete_category;
