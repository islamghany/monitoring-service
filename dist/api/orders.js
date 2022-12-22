"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliverOrder = exports.claimOrder = exports.getAvailableOrders = exports.addOrder = exports.getSenderOrders = void 0;
const db_1 = require("@/db");
const Orders_1 = require("@/db/entity/Orders");
const errors_1 = require("@/helpers/errors");
const http_status_codes_1 = require("http-status-codes");
const getSenderOrders = async (req, res, next) => {
    var _a;
    const id = req.params.id;
    let NID;
    try {
        NID = parseInt(id);
        if (NID !== ((_a = req.auth) === null || _a === void 0 ? void 0 : _a.id)) {
            return next((0, errors_1.authenticationRequiredResponse)());
        }
    }
    catch (err) {
        return next((0, errors_1.badRequestResponse)());
    }
    let orders;
    try {
        orders = await db_1.ordersRepository.find({
            where: {
                biker: {
                    id: NID,
                },
            },
        });
    }
    catch (err) { }
    return res.status(http_status_codes_1.StatusCodes.OK).json(Orders_1.Order);
};
exports.getSenderOrders = getSenderOrders;
const addOrder = (req, res) => {
    const { senderID } = req.body;
    return res.status(http_status_codes_1.StatusCodes.OK).json([]);
};
exports.addOrder = addOrder;
const getAvailableOrders = (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json([]);
};
exports.getAvailableOrders = getAvailableOrders;
const claimOrder = (req, res) => {
    const { bikerID, orderID } = req.body;
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Successful Operation",
    });
};
exports.claimOrder = claimOrder;
const deliverOrder = (req, res) => {
    const { bikerID, orderID, delivery_at } = req.body;
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Successful Operation",
    });
};
exports.deliverOrder = deliverOrder;
//# sourceMappingURL=orders.js.map