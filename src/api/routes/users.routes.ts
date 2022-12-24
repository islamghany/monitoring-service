import { Router } from "express";
import {
  RegisterUserHandler,
  activateUserHandler,
  getUserHandler,
  loginHandler,
} from "../handlers";
const usersRoutes = Router();

usersRoutes.post("/", RegisterUserHandler);

usersRoutes.put("/activate", activateUserHandler);

usersRoutes.get("/:id", getUserHandler);

usersRoutes.post("/login", loginHandler);

export default usersRoutes;
