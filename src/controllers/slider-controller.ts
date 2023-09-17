import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const Slider = db.Slider;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_slider: RequestHandler = async (req, res, next) => {
  const { width, height, sub_title, title, dash_id } = req.body;

  try {
    console.log("This is ...", Slider);
    const foundSlider = await Slider.findOne({
      attributes: ["title"],
      where: { title: title },
    });

    if (foundSlider) {
      return next(
        new BaseError("Slider name already exist!", httpStatusCodes.CONFLICT)
      );
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

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Slider created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const get_slider: RequestHandler = async (req, res, next) => {
  const { s_id } = req.params;

  try {
    console.log("This is ...", Slider);
    const foundSlider = await Slider.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: s_id },
    });

    if (!foundSlider) {
      return next(
        new BaseError("Slider does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Slider info!.",
      data: foundSlider,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const get_all_sliders: RequestHandler = async (req, res, next) => {
  try {
    console.log("This is ...", Slider);
    const foundSliders = await Slider.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!foundSliders) {
      return next(
        new BaseError("Sliders does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "All sliders!.",
      data: foundSliders,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const update_slider: RequestHandler = async (req, res, next) => {
  const { width, height, sub_title, title } = req.body;
  const { s_id } = req.params;

  try {
    console.log("This is ...", Slider);
    const foundSlider = await Slider.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: s_id },
    });

    if (!foundSlider) {
      return next(
        new BaseError("Slider does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    const updatedSlider = await foundSlider;
    updatedSlider.title = title ? title : foundSlider.title;
    updatedSlider.width = width ? width : foundSlider.width;
    updatedSlider.height = height ? height : foundSlider.height;
    updatedSlider.sub_title = sub_title ? sub_title : foundSlider.sub_title;
    updatedSlider.save();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Slider updated!.",
      data: updatedSlider,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const delete_slider: RequestHandler = async (req, res, next) => {
  const { s_id } = req.params;

  try {
    console.log("This is ...", Slider);
    const foundSlider = await Slider.findOne({
      where: { id: s_id },
    });

    if (!foundSlider) {
      return next(
        new BaseError("Slider does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    await foundSlider.destroy();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Slider deleted!.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
