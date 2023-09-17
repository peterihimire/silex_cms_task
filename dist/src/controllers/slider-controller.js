"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_slider = exports.update_slider = exports.get_all_sliders = exports.get_slider = exports.create_slider = void 0;
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
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_slider = async (req, res, next) => {
    const { s_id } = req.params;
    try {
        console.log("This is ...", Slider);
        const foundSlider = await Slider.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: s_id },
        });
        if (!foundSlider) {
            return next(new base_error_1.default("Slider does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Slider info!.",
            data: foundSlider,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_slider = get_slider;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const get_all_sliders = async (req, res, next) => {
    try {
        console.log("This is ...", Slider);
        const foundSliders = await Slider.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (!foundSliders) {
            return next(new base_error_1.default("Sliders does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "All sliders!.",
            data: foundSliders,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.get_all_sliders = get_all_sliders;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const update_slider = async (req, res, next) => {
    const { width, height, sub_title, title } = req.body;
    const { s_id } = req.params;
    try {
        console.log("This is ...", Slider);
        const foundSlider = await Slider.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { id: s_id },
        });
        if (!foundSlider) {
            return next(new base_error_1.default("Slider does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const updatedSlider = await foundSlider;
        updatedSlider.title = title ? title : foundSlider.title;
        updatedSlider.width = width ? width : foundSlider.width;
        updatedSlider.height = height ? height : foundSlider.height;
        updatedSlider.sub_title = sub_title ? sub_title : foundSlider.sub_title;
        updatedSlider.save();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Slider updated!.",
            data: updatedSlider,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.update_slider = update_slider;
// @route POST api/auth/login
// @desc Login into account
// @access Private
const delete_slider = async (req, res, next) => {
    const { s_id } = req.params;
    try {
        console.log("This is ...", Slider);
        const foundSlider = await Slider.findOne({
            where: { id: s_id },
        });
        if (!foundSlider) {
            return next(new base_error_1.default("Slider does not exist!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        await foundSlider.destroy();
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Slider deleted!.",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.delete_slider = delete_slider;
