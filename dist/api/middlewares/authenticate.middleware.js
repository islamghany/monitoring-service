"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const token_1 = require("./../helpers/token");
const errors_1 = require("../helpers/errors");
const authenticate = (req, res, next) => {
    var _a;
    let token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || undefined;
    if (!token) {
        return next();
    }
    let decodedToken;
    try {
        decodedToken = (0, token_1.verifyToken)(token);
        decodedToken;
    }
    catch (err) {
        return next((0, errors_1.serverErrorResponse)(err));
    }
    if (typeof decodedToken === "undefined") {
        return next();
    }
    req.auth = {
        email: decodedToken.email,
        id: decodedToken.id,
    };
    return next();
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.middleware.js.map