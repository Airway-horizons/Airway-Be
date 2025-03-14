import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

import { dbName } from "../utils/helper.js";

dotenv.config();

const uri = process.env.DB_URL;

let db;

export const connectDB = async () => {
  if (db) return db; // Return existing connection if already established
  try {
    const client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });

    await client.connect();
    db = client.db(dbName); // Replace with your DB name
    // console.log("Connected to MongoDB!");
    return db;
  } catch (error) {
    // console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
