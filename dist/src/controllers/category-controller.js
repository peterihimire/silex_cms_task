"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_category = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
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
            return next(new base_error_1.default("Flipbox name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
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
