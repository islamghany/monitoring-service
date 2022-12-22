"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoutes = (0, express_1.Router)();
usersRoutes.post("/register");
usersRoutes.post("/login");
usersRoutes.patch("/activate");
exports.default = usersRoutes;
//# sourceMappingURL=users.routes.js.map