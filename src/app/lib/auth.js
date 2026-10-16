import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const globalForBazarDor = globalThis;

export async function getAuth() {
  if (globalForBazarDor.bazarDorAuthPromise) {
    return globalForBazarDor.bazarDorAuthPromise;
  }

  globalForBazarDor.bazarDorAuthPromise = (async () => {
    const uri = process.env.MONGODB_URI;
    const secret = process.env.BETTER_AUTH_SECRET;
    const baseURL = process.env.BETTER_AUTH_URL;

    if (!uri) {
      throw new Error("MONGODB_URI is missing. Set it in Vercel Project Settings > Environment Variables.");
    }

    if (!secret) {
      throw new Error("BETTER_AUTH_SECRET is missing. Set it in Vercel Project Settings > Environment Variables.");
    }

    if (!baseURL) {
      throw new Error("BETTER_AUTH_URL is missing. Set it in Vercel Project Settings > Environment Variables.");
    }

    let client = globalForBazarDor.bazarDorMongoClient;

    if (!client) {
      client = new MongoClient(uri);
      globalForBazarDor.bazarDorMongoClient = client;
    }

    await client.connect();

    const db = client.db("bazar-dor");

    return betterAuth({
      baseURL,
      secret,
      trustedOrigins: [
        baseURL,
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        "http://localhost:3000",
      ].filter(Boolean),
      database: mongodbAdapter(db, { client }),
      emailAndPassword: {
        enabled: true,
      },
    });
  })();

  try {
    return await globalForBazarDor.bazarDorAuthPromise;
  } catch (error) {
    delete globalForBazarDor.bazarDorAuthPromise;
    throw error;
  }
}
