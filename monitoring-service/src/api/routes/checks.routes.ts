import { Router } from "express";

import { createCheck, getCheck, listChecks } from "../handlers/checks.handler";
import { asyncWrapper } from "../helpers/asyncWrapper";

import {
  authenticate,
  requireActivatedUser,
  requiredAuthentication,
} from "../middlewares";

const checksRoutes = Router();

checksRoutes.use(authenticate, requiredAuthentication, requireActivatedUser);

checksRoutes.route("").get(listChecks).post(createCheck);

checksRoutes.route("/:id").get(getCheck);

export default checksRoutes;
