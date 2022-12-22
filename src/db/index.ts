import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Check } from "./entities/Check";
import { Report } from "./entities/Report";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: "root",
  password: "secret",
  database: "monitoring",
  entities: [User, Check, Report],
  synchronize: true, // remove on production
  logging: false,
});

export const usersRepository = AppDataSource.getRepository(User);
export const reportsRepository = AppDataSource.getRepository(Report);
export const checksRepository = AppDataSource.getRepository(Check);

export default AppDataSource;
