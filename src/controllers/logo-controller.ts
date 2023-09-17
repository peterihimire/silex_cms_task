import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const Logo = db.Logo;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_logo: RequestHandler = async (req, res, next) => {
  const { width, height, name, dash_id, position } = req.body;

  try {
    const img_url = req?.file?.path;

    console.log("This is ...", Logo);
    const foundLogo = await Logo.findOne({
      attributes: ["name"],
      where: { name: name },
    });

    // LOGO NOT OPTIONAL
    if (!req.file) {
      next(new BaseError("No logo provided!", httpStatusCodes.BAD_REQUEST));
    }

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
      position: position,
      dashboardId: dash_id,
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

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const get_logo: RequestHandler = async (req, res, next) => {
  const { l_id } = req.params;

  try {
    console.log("This is ...", Logo);
    const foundLogo = await Logo.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: l_id },
    });

    if (!foundLogo) {
      return next(
        new BaseError("Logo does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Logo info!.",
      data: foundLogo,
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
export const get_all_logos: RequestHandler = async (req, res, next) => {
  try {
    console.log("This is ...", Logo);
    const foundLogos = await Logo.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!foundLogos) {
      return next(
        new BaseError("Categories does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "All logos!.",
      data: foundLogos,
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
export const update_logo: RequestHandler = async (req, res, next) => {
  const { name, width, height, position } = req.body;
  const { l_id } = req.params;

  try {
    const img_url = req?.file?.path;
    console.log("This is ...", Logo);
    const foundLogo = await Logo.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: l_id },
    });

    if (!foundLogo) {
      return next(
        new BaseError("Logo does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    const updatedLogo = await foundLogo;
    updatedLogo.name = name;
    updatedLogo.width = width;
    updatedLogo.height = height;
    updatedLogo.position = position;
    updatedLogo.img_url = img_url;
    updatedLogo.save();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Logo updated!.",
      data: updatedLogo,
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
export const delete_logo: RequestHandler = async (req, res, next) => {
  const { l_id } = req.params;

  try {
    console.log("This is ...", Logo);
    const foundLogo = await Logo.findOne({
      where: { id: l_id },
    });

    if (!foundLogo) {
      return next(
        new BaseError("Logo does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    await foundLogo.destroy();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Logo deleted!.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
