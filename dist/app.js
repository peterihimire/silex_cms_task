"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis = __importStar(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const auth_route_1 = __importDefault(require("./src/routes/auth-route"));
const dashboard_route_1 = __importDefault(require("./src/routes/dashboard-route"));
const flipbox_route_1 = __importDefault(require("./src/routes/flipbox-route"));
const logo_route_1 = __importDefault(require("./src/routes/logo-route"));
const menu_route_1 = __importDefault(require("./src/routes/menu-route"));
const slider_route_1 = __importDefault(require("./src/routes/slider-route"));
const test_route_1 = __importDefault(require("./src/routes/test-route"));
const error_handler_1 = require("./src/middlewares/error-handler");
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
let redisStore = new connect_redis_1.default({
    client: redisclient,
    prefix: "ecommerce_store",
});
const corsOptions = {
    origin: ["*", "http://localhost:3020"],
    methods: ["*"],
    allowedHeaders: ["*"],
    credentials: true,
    optionSuccessStatus: 200,
};
const sessionOptions = {
    // store: new RedisStore({ client: redisClient }),
    store: redisStore,
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60, // session max age in miliseconds
    },
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use("/api/silex_task/v1/auth", (0, express_session_1.default)(sessionOptions), auth_route_1.default);
app.use("/api/silex_task/v1/dashboards", (0, express_session_1.default)(sessionOptions), dashboard_route_1.default);
app.use("/api/silex_task/v1/flipboxes", (0, express_session_1.default)(sessionOptions), flipbox_route_1.default);
app.use("/api/silex_task/v1/logos", (0, express_session_1.default)(sessionOptions), logo_route_1.default);
app.use("/api/silex_task/v1/menus", (0, express_session_1.default)(sessionOptions), menu_route_1.default);
app.use("/api/silex_task/v1/sliders", (0, express_session_1.default)(sessionOptions), slider_route_1.default);
app.use("/api/silex_task/v1/tests", test_route_1.default);
app.use(error_handler_1.unknownRoute);
app.use(error_handler_1.logErrorMiddleware);
app.use(error_handler_1.returnError);
exports.default = app;
