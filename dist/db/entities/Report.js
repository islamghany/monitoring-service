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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const Check_1 = require("./Check");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../types/enums");
let Report = class Report {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.ServerStatus,
        nullable: false,
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "double",
        nullable: false,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Report.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int8",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Report.prototype, "outages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int8",
        default: 0,
        name: "alert_times",
    }),
    __metadata("design:type", Number)
], Report.prototype, "alertTimes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        default: 0,
    }),
    __metadata("design:type", Number)
], Report.prototype, "downtime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        default: 0,
    }),
    __metadata("design:type", Number)
], Report.prototype, "uptime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "double",
        nullable: false,
        name: "response_times",
    }),
    __metadata("design:type", Number)
], Report.prototype, "responseTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-array",
        nullable: false,
    }),
    __metadata("design:type", Array)
], Report.prototype, "history", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Check_1.Check, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Check_1.Check)
], Report.prototype, "check", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
    }),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "updated_at",
    }),
    __metadata("design:type", Date)
], Report.prototype, "updatedAt", void 0);
Report = __decorate([
    (0, typeorm_1.Entity)()
], Report);
exports.Report = Report;
//# sourceMappingURL=Report.js.map