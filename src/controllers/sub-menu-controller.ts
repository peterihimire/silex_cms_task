import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const SubMenu = db.SubMenu;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_sub_menu: RequestHandler = async (req, res, next) => {
  const { menu_id, slug, link, title } = req.body;

  try {
    console.log("This is ...", SubMenu);
    const foundSubMenu = await SubMenu.findOne({
      attributes: ["title"],
      where: { title: title },
    });

    if (foundSubMenu) {
      return next(
        new BaseError("Sub-menu title already exist!", httpStatusCodes.CONFLICT)
      );
    }

    // CREATE NEW MENU
    const createdSubMenu = await SubMenu.create({
      title: title,
      link: link,
      slug: slug,
      menuId: menu_id,
    });

    const { id, ...others } = createdSubMenu.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Sub-menu created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
