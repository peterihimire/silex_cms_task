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
const Logo = models_1.default.Logo;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_logo = async (req, res, next) => {
    var _a;
    const { width, height, name, dash_id, position } = req.body;
    try {
        const img_url = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
        console.log("This is ...", Logo);
        const foundLogo = await Logo.findOne({
            attributes: ["name"],
            where: { name: name },
        });
        // LOGO NOT OPTIONAL
        if (!req.file) {
            next(new base_error_1.default("No logo provided!", http_status_codes_1.httpStatusCodes.BAD_REQUEST));
        }
        if (foundLogo) {
            return next(new base_error_1.default("Logo name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW LOGO
        const createdLogo = await Logo.create({
            name: name,
            width: width,
            height: height,
            img_url: img_url,
            position: position,
            dashboardId: dash_id,
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
