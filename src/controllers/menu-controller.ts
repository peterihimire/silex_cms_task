import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const Menu = db.Menu;
const SubMenu = db.SubMenu;

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

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const get_menu: RequestHandler = async (req, res, next) => {
  const { m_id } = req.params;

  try {
    console.log("This is ...", Menu);
    const foundMenu = await Menu.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: m_id },
      include: [
        {
          model: SubMenu,
          as: "submenus",
        },
      ],
    });

    if (!foundMenu) {
      return next(
        new BaseError("Menu does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Menu info!.",
      data: foundMenu,
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
export const get_all_menus: RequestHandler = async (req, res, next) => {
  try {
    console.log("This is ...", Menu);
    const foundMenus = await Menu.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: SubMenu,
          as: "submenus",
        },
      ],
    });

    if (!foundMenus) {
      return next(
        new BaseError("Menus does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "All menus!.",
      data: foundMenus,
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
export const update_menu: RequestHandler = async (req, res, next) => {
  const { has_sub_menu, slug, link, title } = req.body;
  const { m_id } = req.params;

  try {
    console.log("This is ...", Menu);
    const foundMenu = await Menu.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: m_id },
      include: [
        {
          model: SubMenu,
          as: "submenus",
        },
      ],
    });

    if (!foundMenu) {
      return next(
        new BaseError("Menu does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    const updatedMenu = await foundMenu;
    updatedMenu.title = title ? title : foundMenu.title;
    updatedMenu.link = link ? link : foundMenu.link;
    updatedMenu.has_sub_menu = has_sub_menu
      ? has_sub_menu
      : foundMenu.has_sub_menu;
    updatedMenu.slug = slug ? slug : foundMenu.slug;

    updatedMenu.save();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Menu updated!.",
      data: updatedMenu,
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
export const delete_menu: RequestHandler = async (req, res, next) => {
  const { m_id } = req.params;

  try {
    console.log("This is ...", Menu);
    const foundMenu = await Menu.findOne({
      where: { id: m_id },
    });

    if (!foundMenu) {
      return next(
        new BaseError("Menu does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    await foundMenu.destroy();

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Menu deleted!.",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
