const production =
  process.env.NODE_ENV && process.env.NODE_ENV === "production";

if (!production) {
  require("dotenv").config();
}

export const apiUrl = production
  ? process.env.PROD_RESTURL
  : process.env.JSONSERVER_RESTURL;

export const jsonUrl = "http://localhost:4000/api/";
