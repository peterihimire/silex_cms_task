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
        new BaseError("Category name already exist!", httpStatusCodes.CONFLICT)
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

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const get_category: RequestHandler = async (req, res, next) => {
  const { cat_id } = req.params;

  try {
    console.log("This is ...", Category);
    const foundCategory = await Category.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: cat_id },
    });

    if (!foundCategory) {
      return next(
        new BaseError("Category does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Category info!.",
      data: foundCategory,
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
export const get_all_categories: RequestHandler = async (req, res, next) => {
  try {
    console.log("This is ...", Category);
    const foundCategories = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!foundCategories) {
      return next(
        new BaseError("Categories does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "All categories!.",
      data: foundCategories,
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
export const update_category: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  const { cat_id } = req.params;

  try {
    console.log("This is ...", Category);
    const foundCategory = await Category.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: cat_id },
    });

    if (!foundCategory) {
      return next(
        new BaseError("Category does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    const updatedCategory = await foundCategory;
    updatedCategory.name = name ? name : foundCategory.name;
    updatedCategory.save();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Category updated!.",
      data: updatedCategory,
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
export const delete_category: RequestHandler = async (req, res, next) => {
  const { cat_id } = req.params;

  try {
    console.log("This is ...", Category);
    const foundCategory = await Category.findOne({
      where: { id: cat_id },
    });

    if (!foundCategory) {
      return next(
        new BaseError("Category does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    await foundCategory.destroy();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Category deleted!.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
