"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const config_json_1 = __importDefault(require("../config.json"));
const getFilesWithKeyword_1 = require("./utils/getFilesWithKeyword");
const app = (0, express_1.default)();
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config();
/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: "5mb", extended: false }));
// parse application/json
app.use(body_parser_1.default.json({ limit: "5mb" }));
// hook morganBody to express app
(0, morgan_body_1.default)(app);
app.set("trust proxy", true);
// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config_json_1.default.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000', 'https://fabulous-macaron-23ebff.netlify.app'],
        credentials: true
    }));
}
// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config_json_1.default.NODE_ENV === 'production') {
    console.log('app is running on production');
    app.use((0, helmet_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client-2/build')));
    app.get('/', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, '../../client-2/build', 'index.html'));
    });
}
/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/
(0, getFilesWithKeyword_1.getFilesWithKeyword)('router', __dirname + '/app').forEach((file) => {
    const { router } = require(file);
    app.use('/api/v1', router);
});
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    return res.status(500).json({
        errorName: err.name,
        message: err.message,
        stack: err.stack || 'no stack defined'
    });
});
exports.default = app;
