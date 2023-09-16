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
