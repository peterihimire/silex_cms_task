"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_slider = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
// import db from "../models";
const models_1 = __importDefault(require("../database/models"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Slider = models_1.default.Slider;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const create_slider = async (req, res, next) => {
    const { width, height, sub_title, title, dash_id } = req.body;
    try {
        console.log("This is ...", Slider);
        const foundSlider = await Slider.findOne({
            attributes: ["title"],
            where: { title: title },
        });
        if (foundSlider) {
            return next(new base_error_1.default("Slider name already exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        // CREATE NEW SLIDER
        const createdSlider = await Slider.create({
            title: title,
            width: width,
            height: height,
            sub_title: sub_title,
            dashboardId: dash_id,
        });
        const { id, ...others } = createdSlider.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Slider created!.",
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
exports.create_slider = create_slider;
