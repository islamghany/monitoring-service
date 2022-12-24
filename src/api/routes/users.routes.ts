import { Router } from "express";
import { RegisterUserHandler, activateUserHandler } from "../handlers";
const usersRoutes = Router();

usersRoutes.post("/", RegisterUserHandler);

usersRoutes.put("/activate", activateUserHandler);

usersRoutes.post("/login");
usersRoutes.get("/id");

export default usersRoutes;
