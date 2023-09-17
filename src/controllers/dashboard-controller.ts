import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const Dashboard = db.Dashboard;
const Flipbox = db.Flipbox;
const Logo = db.Logo;
const Menu = db.Menu;
const Slider = db.Slider;
const Category = db.Category;
const SubMenu = db.SubMenu;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_dashboard: RequestHandler = async (req, res, next) => {
  const { name, user_id } = req.body;

  console.log("thia is ...", Dashboard);
  try {
    console.log("This is ...", Dashboard);
    const foundDashboard = await Dashboard.findOne({
      attributes: ["name"],
      where: { name: name },
    });

    if (foundDashboard) {
      return next(
        new BaseError("Dashboard name already exist!", httpStatusCodes.CONFLICT)
      );
    }

    // CREATE NEW ACCOUNT
    const createdDashboard = await Dashboard.create({
      name: name,
      userId: user_id,
    });

    const { id, createdAt, updatedAt, ...others } = createdDashboard.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Dashboard created!.",
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
export const get_dashboard: RequestHandler = async (req, res, next) => {
  const { dash_id } = req.params;

  console.log("thia is ...", Dashboard);
  try {
    console.log("This is ...", Dashboard);
    const foundDashboard = await Dashboard.findOne({
      attributes: ["dash_id"],
      where: { dash_id: dash_id },
      include: [
        {
          model: Flipbox,
          as: "flipboxes",
          include: [
            {
              model: Category,
              as: "categories",
              through: {
                attributes: [],
              },
            },
          ],
        },
        { model: Logo, as: "logos" },
        {
          model: Menu,
          as: "menus",
          include: [
            {
              model: SubMenu,
              as: "submenus",
            },
          ],
        },
        { model: Slider, as: "sliders" },
      ],
    });

    if (!foundDashboard) {
      return next(
        new BaseError("Dashboard does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    const dashboard = foundDashboard.dataValues;

    console.log("This is ...", Category);
    const foundCategories = await Category.findAll({
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });

    if (!foundCategories) {
      return next(
        new BaseError("Categories does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Dashboard info!.",
      data: { ...dashboard, flipbox_cat: foundCategories },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
