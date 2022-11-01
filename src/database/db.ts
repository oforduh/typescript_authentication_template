import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
});

let URL: string;
process.env.NODE_ENV !== "production"
  ? (URL = process.env.MONGO_URI_DEV!)
  : (URL = process.env.MONGO_URI_LIVE!);

const dbConnection = async () => {
  await mongoose.connect(URL);
  console.log(`Db connected`);
};

export { dbConnection };
