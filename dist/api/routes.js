"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("./middlewares");
const orders_1 = require("./orders");
const senders_1 = require("./senders");
const router = (0, express_1.Router)();
router.post("/login/sender", senders_1.senderLogin);
router.post("/login/biker", () => { });
router.get("/sender/:id/orders", middlewares_1.checkAuth, (0, middlewares_1.protectedRoute)("SENDER"), orders_1.getSenderOrders);
router.post("/orders", orders_1.addOrder);
router.get("/orders/available", orders_1.getAvailableOrders);
router.patch("/orders/claim", orders_1.claimOrder);
router.patch("/orders/deliver", orders_1.deliverOrder);
exports.default = router;
//# sourceMappingURL=routes.js.map