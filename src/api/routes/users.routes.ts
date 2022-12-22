import { Router } from "express";

const usersRoutes = Router();

usersRoutes.post("/register");

usersRoutes.post("/login");

usersRoutes.patch("/activate");

export default usersRoutes;
