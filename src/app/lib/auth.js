
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing");
}

const globalForMongo = globalThis;

const client =
  globalForMongo.bazarDorMongoClient ||
  new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.bazarDorMongoClient = client;
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    "https://bazar-dor-mkje.vercel.app",
    "http://localhost:3000",
  ],

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
});
