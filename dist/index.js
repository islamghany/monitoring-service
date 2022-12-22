"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const index_1 = __importDefault(require("./db/index"));
const errors_1 = require("./api/helpers/errors");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./docs/swagger.json"));
const users_routes_1 = __importDefault(require("./api/routes/users.routes"));
const checks_routes_1 = __importDefault(require("./api/routes/checks.routes"));
const reports_routes_1 = __importDefault(require("./api/routes/reports.routes"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/v1/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/v1/users", users_routes_1.default);
app.use("v1//checks", checks_routes_1.default);
app.use("/v1/reports", reports_routes_1.default);
app.use("*", (req, res, next) => {
    next((0, errors_1.notFoundResponse)());
});
app.use((err, req, res, next) => {
    if (err.code === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(err);
    res.status(err.code).json({
        success: false,
        message: err.message,
    });
});
index_1.default.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
})
    .catch((err) => console.error(err));
process.on("unhandledRejection", (err, promise) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    process.exit(1);
    throw err;
});
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.log("TERMINATING THE SERVER! 💥 Shutting down...");
    process.exit(1);
});
process.on("SIGINT", () => {
    console.log("TERMINATING THE SERVER! 💥 Shutting down...");
    process.exit(1);
});
//# sourceMappingURL=index.js.map