"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikerLogin = void 0;
const token_1 = require("./../helpers/token");
const http_status_codes_1 = require("http-status-codes");
const db_1 = require("../db");
const errors_1 = require("../helpers/errors");
const bikerLogin = async (req, res, next) => {
    const input = req.body;
    let biker;
    try {
        biker = await db_1.bikerRepository.findOne({
            where: {
                email: input.email,
            },
        });
        if (!biker || biker.password !== input.password) {
            return next((0, errors_1.invalidCredentialsResponse)());
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            token: (0, token_1.generateToken)({
                id: biker.id,
                email: biker.email,
            }),
            user: {
                id: biker.id,
                email: biker.email,
                name: biker.name,
            },
        });
    }
    catch (err) {
        return next((0, errors_1.serverErrorResponse)(err));
    }
};
exports.bikerLogin = bikerLogin;
//# sourceMappingURL=bikers.js.map