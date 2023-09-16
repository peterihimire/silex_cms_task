import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const Flipbox = db.Flipbox;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_flipbox: RequestHandler = async (req, res, next) => {
  const { dash_id, desc, title } = req.body;

  try {
    console.log("This is ...", Flipbox);
    const foundFlipbox = await Flipbox.findOne({
      attributes: ["title"],
      where: { title: title },
    });

    if (foundFlipbox) {
      return next(
        new BaseError("Flipbox name already exist!", httpStatusCodes.CONFLICT)
      );
    }

    // CREATE NEW LOGO
    const createdFlipbox = await Flipbox.create({
      desc: desc,
      title: title,
      dashboardId: dash_id,
    });

    const { id, ...others } = createdFlipbox.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Flipbox created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
