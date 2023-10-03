import express, { Application, Request } from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as redis from "redis";
import RedisStore from "connect-redis";
import multer from "multer";
import path from "path";

const BaseError = require("./src/utils/base-error");
const httpStatusCodes = require("./src/utils/http-status-codes");

import authRoute from "./src/routes/auth-route";
import dashboardRoute from "./src/routes/dashboard-route";
import flipboxRoute from "./src/routes/flipbox-route";
import logoRoute from "./src/routes/logo-route";
import menuRoute from "./src/routes/menu-route";
import subMenuRoute from "./src/routes/sub-menu-route";
import sliderRoute from "./src/routes/slider-route";
import categoryRoute from "./src/routes/category-route";
import testRoute from "./src/routes/test-route";
import {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} from "./src/middlewares/error-handler";

type User = {
  id: string;
  email: string;
};

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

const file_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("🚀 ~ file: upload.ts:11 ~ file", process.cwd());
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        new Date().toISOString() +
        "." +
        ext
    );
    // cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const file_filter = (req: Request, file: any, cb: Function) => {
  const fileSize = parseInt(req.headers["content-length"] as string);
  console.log("This si req file size", fileSize);
  if (fileSize > 500000) {
    cb(
      new BaseError(
        "Images must be under 500kb!",
        httpStatusCodes.UNPROCESSABLE_ENTITY
      ),
      false
    );
  }
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new BaseError(
        "Only images are allowed!",
        httpStatusCodes.UNPROCESSABLE_ENTITY
      ),
      false
    );
  }
};

let redisclient = redis.createClient({
  legacyMode: false,
  socket: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_URL,
  },
});

(async () => {
  await redisclient.connect();
})();

redisclient.on("ready", () => {
  console.log("Redis client is ready!");
});

redisclient.on("connect", function () {
  console.log("Redis client connected...");
});

redisclient.on("error", (err) => {
  console.log("Error in the connection!");
});

let redisStore = new (RedisStore as any)({
  client: redisclient,
  prefix: "ecommerce_store",
});

const corsOptions = {
  origin: [
    // process.env.CORS_ORIGIN as string,
    "https://silexcms.onrender.com",
    "http://localhost:3000",
    "https://localhost:3000",
  ],
  methods: ["GET", "PUT", "PATCH", "POST", "OPTIONS", "DELETE", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

const multerOptions = multer({
  storage: file_storage,
  limits: { fileSize: 500000 },
  fileFilter: file_filter,
}).single("img_url");

const sessionOptions = {
  // store: new RedisStore({ client: redisClient }),
  store: redisStore,
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // if true only transmit cookie over https
    httpOnly: true, // if true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 60, // session max age in miliseconds
    sameSite: false,
    // sameSite: "none" as const,
  },
};

const app: Application = express();

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(multerOptions);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/silex_task/v1/auth", session(sessionOptions), authRoute);
app.use(
  "/api/silex_task/v1/dashboards",
  session(sessionOptions),
  dashboardRoute
);
app.use("/api/silex_task/v1/flipboxes", session(sessionOptions), flipboxRoute);
app.use("/api/silex_task/v1/logos", session(sessionOptions), logoRoute);
app.use("/api/silex_task/v1/menus", session(sessionOptions), menuRoute);
app.use("/api/silex_task/v1/sub-menus", session(sessionOptions), subMenuRoute);
app.use("/api/silex_task/v1/sliders", session(sessionOptions), sliderRoute);
app.use(
  "/api/silex_task/v1/categories",
  session(sessionOptions),
  categoryRoute
);
app.use("/api/silex_task/v1/tests", testRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);
export default app;
