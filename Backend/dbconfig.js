import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;
console.log("MONGO_URL =",process.env.MONGO_URL)
const client = new MongoClient(url);

const dbName = "Todo-mern";
const collectionName = "todolist";

const connection = async () => {
  try {
    await client.connect();

    return client.db(dbName);

  } catch (error) {
    console.error("Mongo error",error);
  }
};

export { connection, collectionName };