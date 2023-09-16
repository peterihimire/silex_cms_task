"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_flipbox = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
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
        // CREATE NEW LOGO
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
