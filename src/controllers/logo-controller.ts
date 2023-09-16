import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const Logo = db.logos;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_logo: RequestHandler = async (req, res, next) => {
  const { width, height, img_url, name, dashboard_id } = req.body;

  try {
    console.log("This is ...", Logo);
    const foundLogo = await Logo.findOne({
      attributes: ["name"],
      where: { name: name },
    });

    if (foundLogo) {
      return next(
        new BaseError("Logo name already exist!", httpStatusCodes.CONFLICT)
      );
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

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Logo created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
