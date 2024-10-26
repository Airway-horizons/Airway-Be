import { ObjectId } from "mongodb";
import { connectDB } from "./connection.js";

export const connectDb = async (collectionName) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  return collection;
};

export const insertDocument = async (collectionName, document) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  return collection.insertOne(document);
};

export const getDocument = async (collectionName) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  return await collection.find().toArray();
};

export const deleteDocument = async (collectionName, id) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
};

export const updateDocument = async (collectionName, id, body) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );
  return result;
};

export const getByIdDocument = async (collectionName, id) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  return await collection.findOne({ _id: new ObjectId(id) });
};
