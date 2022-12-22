"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.checkAuth = void 0;
const token_1 = require("./../helpers/token");
const errors_1 = require("../helpers/errors");
const db_1 = require("../db");
const checkAuth = (req, res, next) => {
    var _a;
    let token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || undefined;
    if (!token) {
        return next();
    }
    let decodedToken;
    try {
        decodedToken = (0, token_1.verifyToken)(token);
    }
    catch (err) {
        return next((0, errors_1.serverErrorResponse)(err));
    }
    req.auth = {
        email: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email,
        id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id,
    };
    return next();
};
exports.checkAuth = checkAuth;
const protectedRoute = (role) => async (req, res, next) => {
    var _a, _b;
    if (role === "BIKER" && ((_a = req.auth) === null || _a === void 0 ? void 0 : _a.id)) {
        try {
            const biker = await db_1.bikerRepository.findOne({
                where: {
                    id: req.auth.id,
                },
            });
            if (!biker) {
                return next((0, errors_1.authenticationRequiredResponse)());
            }
            return next();
        }
        catch (err) {
            return next((0, errors_1.serverErrorResponse)(err));
        }
    }
    if (role === "SENDER" && ((_b = req.auth) === null || _b === void 0 ? void 0 : _b.id)) {
        try {
            const biker = await db_1.senderRepository.findOne({
                where: {
                    id: req.auth.id,
                },
            });
            if (!biker) {
                return next((0, errors_1.authenticationRequiredResponse)());
            }
            return next();
        }
        catch (err) {
            return next((0, errors_1.serverErrorResponse)(err));
        }
    }
    return next((0, errors_1.authenticationRequiredResponse)());
};
exports.protectedRoute = protectedRoute;
//# sourceMappingURL=middlewares.js.map