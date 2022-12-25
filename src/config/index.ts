export const config = {
  PRIVATE_KEY:
    process.env?.PRIVATE_KEY || "dmnjfdbgsvfsfssdfdfgdfgsrefefsdffsw",
  POSTGRES_USER: process.env?.POSTGRES_USER || "root",
  POSTGRES_PASSWORD: process.env?.POSTGRES_PASSWORD || "secret",
  POSTGRES_DB: process.env?.POSTGRES_DB || "monitoring",
  POSTGRES_PORT: process.env?.POSTGRES_PORT || 5431,
  POSTGRES_HOST: process.env?.POSTGRES_HOST || "localhost",
  PORT: process.env?.PORT || 8080,
  NODE_ENV: process.env?.NODE_ENV || "development",
  MONITORING_EMAIL: process.env?.MONITORING_EMAIL || "dump.dumper77@gmail.com",
  MONITORING_EMAIL_PASSWORD:
    process.env?.MONITORING_EMAIL_PASSWORD || "2116514541",
};
