import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";


const client = new MongoClient (process.env.MONGODB_URI)
const db=client.db("focushub")

export const auth = betterAuth({
    database:mongodbAdapter(db,{
        client
    }),
    emailAndPassword:{
        enabled:true
    },
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_SECRET,

        }
    },
    session:{
cookieCache:{
    enabled:true,
    strategy:"jwt",
    maxAge:7*24*60*60
}
    },
    plugins:[
        jwt()

    ]
})










































// const uri = process.env.MONGODB_URI;

// if (!uri) {
//     throw new Error("Missing MONGODB_URI environment variable");
// }

// const globalForMongo = globalThis;

// const client =
//     globalForMongo._focusHubMongoClient ??
//     new MongoClient(uri, {
//         serverSelectionTimeoutMS: 10000,
//     });

// if (!globalForMongo._focusHubMongoClient) {
//     globalForMongo._focusHubMongoClient = client;
// }

// const db = client.db("focushub");

// const socialProviders = {};

// if (process.env.GOOGLE_CLIENTID && process.env.GOOGLE_SECRET) {
//     socialProviders.google = {
//         clientId: process.env.GOOGLE_CLIENTID,
//         clientSecret: process.env.GOOGLE_SECRET,
//     };
// }

// export const auth = betterAuth({
//     secret: process.env.BETTER_AUTH_SECRET,
//     baseURL: process.env.BETTER_AUTH_URL,
//     database: mongodbAdapter(db, {
//         client,
        
//     }),
//     emailAndPassword: {
//         enabled: true,
//     },
//     socialProviders,
// });
