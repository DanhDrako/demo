require('dotenv').config();

export const configurations = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10),
  appAddress: process.env.APP_ADDRESS,
  websiteURL: process.env.WEBSITE_URL,
  emailSupport: process.env.EMAIL_SUPPORT,
  adminPassword: process.env.ADMIN_PASSWORD,
  systemName: process.env.SYSTEM_NAME,
  rateLimitWindow: parseFloat(process.env.RATE_LIMIT_WINDOW),
  rateLimitMaxRquest: parseInt(process.env.RATE_LIMIT_MAX_REQUEST),
};

export const dbConfig = {
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
};
export const jwtConstants = {
  //secret: 'secretKey',
  SECRET: process.env.JWT_SECRET,
  EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
};
