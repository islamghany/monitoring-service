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
exports.Check = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../types/enums");
const Report_1 = require("./Report");
const User_1 = require("./User");
let Check = class Check {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Check.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: "text",
    }),
    __metadata("design:type", String)
], Check.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: "text",
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Check.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.ProtocolTypes,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Check.prototype, "protocol", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], Check.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int8",
    }),
    __metadata("design:type", Number)
], Check.prototype, "port", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Check.prototype, "webhook", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 5,
    }),
    __metadata("design:type", Number)
], Check.prototype, "timeout", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 10,
    }),
    __metadata("design:type", Number)
], Check.prototype, "interval", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 1,
    }),
    __metadata("design:type", Number)
], Check.prototype, "threshold", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-json",
    }),
    __metadata("design:type", Object)
], Check.prototype, "authentication", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-json",
        name: "http_headers",
    }),
    __metadata("design:type", Array)
], Check.prototype, "httpHeaders", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-json",
    }),
    __metadata("design:type", Object)
], Check.prototype, "asserts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-array",
    }),
    __metadata("design:type", Array)
], Check.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bool",
        name: "ignore_ssl",
    }),
    __metadata("design:type", Boolean)
], Check.prototype, "ignoreSSL", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Check.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Check.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Report_1.Report),
    __metadata("design:type", Report_1.Report)
], Check.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.checks, {
        nullable: false,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], Check.prototype, "user", void 0);
Check = __decorate([
    (0, typeorm_1.Entity)()
], Check);
exports.Check = Check;
//# sourceMappingURL=Check.js.map