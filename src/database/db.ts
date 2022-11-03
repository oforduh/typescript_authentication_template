import mongoose from "mongoose";
import path from "path";

// if you add something to env example and it is not in env it will throw an example
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
