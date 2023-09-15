import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import db from "../models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const User = db.users;

// @route POST api/auth/login
// @desc Login into account
// @access Public
export const register: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const original_password = req.body.password;

  console.log("thia is ...", User);
  try {
    console.log("This is ...", User);
    const foundUser = await User.findOne({
      attributes: ["email"],
      where: { email: email },
    });

    if (foundUser) {
      return next(
        new BaseError(
          "Account already exist, login instead!",
          httpStatusCodes.CONFLICT
        )
      );
    }

    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(original_password, salt);

    // CREATE NEW ACCOUNT
    const createdUser = await User.create({
      email: email,
      password: hashed_password,
    });

    const { id, password, ...others } = createdUser.dataValues;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Account created!.",
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
// @access Public
export const login: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const original_password = req.body.password;

  try {
    const foundUser = await User.findOne({
      where: { email: email },
    });
    console.log("found data", foundUser);
    if (!foundUser) {
      return next(
        new BaseError(
          "Error login in check credentials!",
          httpStatusCodes.CONFLICT
        )
      );
    }

    const hashedPassword = await bcrypt.compare(
      original_password,
      foundUser.password
    );

    if (!hashedPassword) {
      return next(
        new BaseError(
          "Wrong password or username!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    // Session
    const { createdAt, updatedAt, ...session_data } = foundUser.dataValues;
    console.log("This is the session data going to the session", session_data);

    const new_session = {
      id: session_data.id.toString(),
      acct_id: session_data.acct_id,
      email: session_data.email,
      password: session_data.password,
    };
    console.log("This is the new session...", new_session);

    req.session.user = new_session;

    // added this 30th May 2023
    req.session.save(function (err) {
      if (err) return next(err);
    });

    const { id, password, ...others } = foundUser.dataValues;
    // const authorities = [];
    // const userRoles = await foundUser.getRoles();
    // console.log(userRoles);
    // for (let i = 0; i < userRoles.length; i++) {
    //   authorities.push("ROLE_" + userRoles[i].name.toUpperCase());
    // }

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "You are logged in",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new BaseError("Logout error!", httpStatusCodes.UNAUTHORIZED));
    }
    console.log("Logout successful!");
    res.status(200).json({
      status: "success",
      msg: "Logout successful!",
    });
  });
};
