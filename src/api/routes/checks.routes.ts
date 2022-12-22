import { Router } from "express";

const checksRoutes = Router();

checksRoutes.get("/");

checksRoutes.all("/:id").get("").delete("").patch("");

export default checksRoutes;
