require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "./pkgs";
// db initializer
import AppDataSource from "./db/index";

// utils
import { notFoundResponse, HttpError } from "./api/helpers/errors";

// docs
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

// routes
import usersRoutes from "./api/routes/users.routes";
import checksRoutes from "./api/routes/checks.routes";
import reportsRoutes from "./api/routes/reports.routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/v1/users", usersRoutes);
app.use("/v1/checks", checksRoutes);
app.use("/v1/reports", reportsRoutes);

app.use("*", (req, res, next) => {
  next(notFoundResponse());
});

// express provide a special middleware to catch errors for us.
// it should be called in last thing in your app otherwise some errors can be slip.
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (err.code === StatusCodes.INTERNAL_SERVER_ERROR) console.log(err);

  res.status(err.code).json({
    success: false,
    message: err.message,
  });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.error(err));

// hanlding panics (uncaughtException) and grancifully shutdown
// the server and close all open connection

//Handle unhandled promise rejections.
process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
  logger.error(err.message, err.name);
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
  throw err;
});

// Handle programmer errors.
process.on("uncaughtException", (err: Error) => {
  logger.error(err.message, err.name);
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});

// handle gracefully shutdown when terminating the server CTRL+C
process.on("SIGTERM", () => {
  logger.error("TERMINATING THE SERVER! 💥 Shutting down...");
  process.exit(1);
});
process.on("SIGINT", () => {
  logger.error("TERMINATING THE SERVER! 💥 Shutting down...");
  process.exit(1);
});
