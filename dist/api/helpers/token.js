"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = (_a = process.env) === null || _a === void 0 ? void 0 : _a.PRIVATE_KEY;
const generateToken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, privateKey, {
            expiresIn: "30d",
        });
        return token;
    }
    catch (err) {
        throw err;
    }
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, privateKey);
        if (typeof payload !== "string") {
            return {
                id: payload.id,
                email: payload.email,
            };
        }
    }
    catch (err) {
        throw err;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map