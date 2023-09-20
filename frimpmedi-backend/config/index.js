require("dotenv").config()

const APP_PORT=process.env.PORT;
const DB_URL = process.env.MONGO_URL;

const jwtPrivateKey = process.env.JWT_SECRET;

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

module.exports = {
  APP_PORT,
  DB_URL,
  jwtPrivateKey,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
};