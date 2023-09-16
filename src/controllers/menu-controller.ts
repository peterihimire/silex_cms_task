import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const Menu = db.menus;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_menu: RequestHandler = async (req, res, next) => {
  const { dash_id, has_sub_menu, slug, link, title } = req.body;

  try {
    console.log("This is ...", Menu);
    const foundMenu = await Menu.findOne({
      attributes: ["title"],
      where: { title: title },
    });

    if (foundMenu) {
      return next(
        new BaseError("Menu title already exist!", httpStatusCodes.CONFLICT)
      );
    }

    // CREATE NEW MENU
    const createdMenu = await Menu.create({
      title: title,
      link: link,
      slug: slug,
      has_sub_menu: has_sub_menu,
      dashboardId: dash_id,
    });

    const { id, password, ...others } = createdMenu.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Menu created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
