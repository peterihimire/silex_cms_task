import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const Category = db.Category;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_category: RequestHandler = async (req, res, next) => {
  const { name } = req.body;

  try {
    console.log("This is ...", Category);
    const foundCategory = await Category.findOne({
      attributes: ["name"],
      where: { name: name },
    });

    if (foundCategory) {
      return next(
        new BaseError("Flipbox name already exist!", httpStatusCodes.CONFLICT)
      );
    }

    // CREATE NEW CATEGORY
    const createdCategory = await Category.create({
      name: name,
    });

    const { id, ...others } = createdCategory.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Category created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
