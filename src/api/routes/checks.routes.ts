import { Router } from "express";

import { createCheck, getCheck, listChecks } from "../handlers/checks.handler";

import {
  authenticate,
  requireActivatedUser,
  requiredAuthentication,
} from "../middlewares";

const checksRoutes = Router();

checksRoutes.use(authenticate, requiredAuthentication, requireActivatedUser);

checksRoutes.route("").get(listChecks).post(createCheck);

checksRoutes.route("/:id").get(getCheck);
// checksRoutes.all("/").get("").post("");

// checksRoutes.all("/:id").get("").delete("").patch("");

export default checksRoutes;
