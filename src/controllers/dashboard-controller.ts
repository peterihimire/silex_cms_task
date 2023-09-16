import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
import dotenv from "dotenv";
dotenv.config();
const Dashboard = db.dashboards;
const Flipbox = db.flipboxes;
const Logo = db.logos;
const Menu = db.menus;
const Slider = db.sliders;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_dashboard: RequestHandler = async (req, res, next) => {
  const { name } = req.body;

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
          // include: [
          //   {
          //     model: Instance,
          //   },
          //   {
          //     model: Channel,
          //   },
          // ],
        },
        { model: Logo },
        { model: Menu },
        { model: Slider },
      ],
    });

    if (!foundDashboard) {
      return next(
        new BaseError("Dashboard does not exist!", httpStatusCodes.CONFLICT)
      );
    }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Dashboard info!.",
      data: foundDashboard,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
