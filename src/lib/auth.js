import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
}

const globalForMongo = globalThis;

const client =
    globalForMongo._focusHubMongoClient ??
    new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
    });

if (!globalForMongo._focusHubMongoClient) {
    globalForMongo._focusHubMongoClient = client;
}

const db = client.db("focushub");

const socialProviders = {};

if (process.env.GOOGLE_CLIENTID && process.env.GOOGLE_SECRET) {
    socialProviders.google = {
        clientId: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_SECRET,
    };
}

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(db, {
        client,
        
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders,
});
