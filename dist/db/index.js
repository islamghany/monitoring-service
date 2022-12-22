"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksRepository = exports.reportsRepository = exports.usersRepository = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Check_1 = require("./entities/Check");
const Report_1 = require("./entities/Report");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "root",
    password: "secret",
    database: "monitoring",
    entities: [User_1.User, Check_1.Check, Report_1.Report],
    synchronize: true,
    logging: false,
});
exports.usersRepository = AppDataSource.getRepository(User_1.User);
exports.reportsRepository = AppDataSource.getRepository(Report_1.Report);
exports.checksRepository = AppDataSource.getRepository(Check_1.Check);
exports.default = AppDataSource;
//# sourceMappingURL=index.js.map