import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../models";
import db from "../database/models";
const Op = db.Sequelize.Op;
import dotenv from "dotenv";
dotenv.config();
const Flipbox = db.Flipbox;
const Category = db.Category;

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const create_flipbox: RequestHandler = async (req, res, next) => {
  const { dash_id, desc, title } = req.body;
  const available_categories = req.body.categories;
  console.log(available_categories);

  try {
    console.log("This is ...", Flipbox);
    const foundFlipbox = await Flipbox.findOne({
      attributes: ["title"],
      where: { title: title },
    });

    if (foundFlipbox) {
      return next(
        new BaseError("Flipbox name already exist!", httpStatusCodes.CONFLICT)
      );
    }

    if (!available_categories) {
      return next(
        new BaseError(`Category(s) not selected.`, httpStatusCodes.BAD_REQUEST)
      );
    }

    // CREATE NEW LOGO
    const createdFlipbox = await Flipbox.create({
      desc: desc,
      title: title,
      dashboardId: dash_id,
    });

    const categories = [];
    // FOR SELECTED COUNTRIES
    if (available_categories) {
      const country_service = await Category.findAll({
        where: {
          name: {
            [Op.or]: available_categories,
          },
        },
      });
      await createdFlipbox.setCategories(country_service);
    }

    const f_categories = await createdFlipbox.getCategories();

    for (let i = 0; i < f_categories.length; i++) {
      categories.push(f_categories[i].name.toUpperCase());
    }

    const { id, ...others } = createdFlipbox.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Flipbox created!.",
      data: { ...others, categories },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
