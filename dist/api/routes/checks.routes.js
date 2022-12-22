"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checksRoutes = (0, express_1.Router)();
checksRoutes.get("/");
checksRoutes.all("/:id").get("").delete("").patch("");
exports.default = checksRoutes;
//# sourceMappingURL=checks.routes.js.map