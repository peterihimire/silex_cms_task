"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const base_error_1 = __importDefault(require("../utils/base-error"));
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User = models_1.default.users;
// @route POST api/auth/login
// @desc Login into account
// @access Public
const register = async (req, res, next) => {
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
            return next(new base_error_1.default("Account already exist, login instead!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const salt = await bcrypt_1.default.genSalt();
        const hashed_password = await bcrypt_1.default.hash(original_password, salt);
        // CREATE NEW ACCOUNT
        const createdUser = await User.create({
            email: email,
            password: hashed_password,
        });
        const { id, password, ...others } = createdUser.dataValues;
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "Account created!.",
            data: { ...others },
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.register = register;
// @route POST api/auth/login
// @desc Login into account
// @access Public
const login = async (req, res, next) => {
    const { email } = req.body;
    const original_password = req.body.password;
    try {
        const foundUser = await User.findOne({
            where: { email: email },
        });
        console.log("found data", foundUser);
        if (!foundUser) {
            return next(new base_error_1.default("Error login in check credentials!", http_status_codes_1.httpStatusCodes.CONFLICT));
        }
        const hashedPassword = await bcrypt_1.default.compare(original_password, foundUser.password);
        if (!hashedPassword) {
            return next(new base_error_1.default("Wrong password or username!", http_status_codes_1.httpStatusCodes.UNAUTHORIZED));
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
            if (err)
                return next(err);
        });
        const { id, password, ...others } = foundUser.dataValues;
        // const authorities = [];
        // const userRoles = await foundUser.getRoles();
        // console.log(userRoles);
        // for (let i = 0; i < userRoles.length; i++) {
        //   authorities.push("ROLE_" + userRoles[i].name.toUpperCase());
        // }
        res.status(http_status_codes_1.httpStatusCodes.OK).json({
            status: "success",
            msg: "You are logged in",
            data: { ...others },
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = http_status_codes_1.httpStatusCodes.INTERNAL_SERVER;
        }
        next(error);
    }
};
exports.login = login;
const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(new base_error_1.default("Logout error!", http_status_codes_1.httpStatusCodes.UNAUTHORIZED));
        }
        console.log("Logout successful!");
        res.status(200).json({
            status: "success",
            msg: "Logout successful!",
        });
    });
};
exports.logout = logout;
