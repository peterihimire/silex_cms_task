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

    // CREATE NEW SUB-MENU
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

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const get_sub_menu: RequestHandler = async (req, res, next) => {
  const { sm_id } = req.params;

  try {
    console.log("This is ...", SubMenu);
    const foundSubMenu = await SubMenu.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: sm_id },
    });

    if (!foundSubMenu) {
      return next(
        new BaseError("SubMenu does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "SubMenu info!.",
      data: foundSubMenu,
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
export const get_all_sub_menus: RequestHandler = async (req, res, next) => {
  try {
    console.log("This is ...", SubMenu);
    const foundSubMenus = await SubMenu.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!foundSubMenus) {
      return next(
        new BaseError("Menus does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "All sub-menus!.",
      data: foundSubMenus,
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
export const update_sub_menu: RequestHandler = async (req, res, next) => {
  const { slug, link, title } = req.body;
  const { sm_id } = req.params;

  try {
    console.log("This is ...", SubMenu);
    const foundSubMenu = await SubMenu.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: sm_id },
    });

    if (!foundSubMenu) {
      return next(
        new BaseError("SubMenu does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    const updatedSubMenu = await foundSubMenu;
    updatedSubMenu.title = title;
    updatedSubMenu.link = link;
    updatedSubMenu.slug = slug;

    updatedSubMenu.save();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "SubMenu updated!.",
      data: updatedSubMenu,
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
export const delete_sub_menu: RequestHandler = async (req, res, next) => {
  const { sm_id } = req.params;

  try {
    console.log("This is ...", SubMenu);
    const foundSubMenu = await SubMenu.findOne({
      where: { id: sm_id },
    });

    if (!foundSubMenu) {
      return next(
        new BaseError("SubMenu does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    await foundSubMenu.destroy();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "SubMenu deleted!.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
