import { Router } from "express";

import {
  createCheck,
  getCheck,
  listChecks,
  updateCheck,
  deleteCheck,
} from "../handlers/checks.handler";

import {
  authenticate,
  requireActivatedUser,
  requiredAuthentication,
} from "../middlewares";

const checksRoutes = Router();

checksRoutes.use(authenticate, requiredAuthentication, requireActivatedUser);

checksRoutes.route("").get(listChecks).post(createCheck);

checksRoutes.route("/:id").get(getCheck).patch(updateCheck).delete(deleteCheck);

export default checksRoutes;
