"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_logo = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Logo = models_1.default.logos;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_logo = async (req, res, next) => {
    const { width, height, img_url, name, dashboard_id } = req.body;
    try {
        console.log("This is ...", Logo);
        const foundLogo = await Logo.findOne({
            attributes: ["name"],
            where: { name: name },
        });
        if (foundLogo) {
            return next(new base_error_1.default("Logo name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW LOGO
        const createdLogo = await Logo.create({
            name: name,
            width: width,
            height: height,
            img_url: img_url,
            dashboardId: dashboard_id,
        });
        const { id, ...others } = createdLogo.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Logo created!.",
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
exports.create_logo = create_logo;
