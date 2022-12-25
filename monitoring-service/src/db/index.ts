import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Check } from "./entities/Check";
import { Report } from "./entities/Report";
import { config } from "../config";
import { Insert1671997068936 } from "./migrations/1671997068936-Insert";

const AppDataSource = new DataSource({
  entities: [User, Check, Report],
  synchronize: true, // remove on production
  logging: false,
  migrationsTableName: "migrations",
  type: "postgres",
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT as number,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  migrations: [Insert1671997068936],
});

export const usersRepository = AppDataSource.getRepository(User);
export const reportsRepository = AppDataSource.getRepository(Report);
export const checksRepository = AppDataSource.getRepository(Check);

export default AppDataSource;
