import { MongoClient } from "mongodb";
import { Database } from "./enums/collection";

export const newMongoDB = async () => {
    console.log(`Now connecting to ${process.env.MONGO_HOST} ${process.env.MONGO_PORT}`);
    const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    const client = new MongoClient(uri, {
        auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PWD
        }
    });

    await client.connect();
    return client.db(Database.HATCH);
}