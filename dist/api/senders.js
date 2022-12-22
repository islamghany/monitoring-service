"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.senderLogin = exports.LoginInput = void 0;
const db_1 = require("../db");
const errors_1 = require("../helpers/errors");
const http_status_codes_1 = require("http-status-codes");
const token_1 = require("../helpers/token");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LoginInput {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
exports.LoginInput = LoginInput;
const senderLogin = async (req, res, next) => {
    const input = (0, class_transformer_1.plainToClass)(LoginInput, req.body);
    const errors = await (0, class_validator_1.validate)(input);
    if (errors.length > 0) {
        return next((0, errors_1.invalidCredentialsResponse)());
    }
    console.log(input);
    let sender;
    try {
        console.log(input.email);
        sender = await db_1.senderRepository.findOneBy({
            email: input.email,
        });
        console.log(sender);
        if (!sender || sender.password !== input.password) {
            return next((0, errors_1.invalidCredentialsResponse)());
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            token: (0, token_1.generateToken)({
                id: sender.id,
                email: sender.email,
            }),
            user: {
                id: sender.id,
                email: sender.email,
                name: sender.name,
            },
        });
    }
    catch (err) {
        return next((0, errors_1.serverErrorResponse)(err));
    }
};
exports.senderLogin = senderLogin;
//# sourceMappingURL=senders.js.map