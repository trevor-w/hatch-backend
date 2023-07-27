import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { initMiddlewares } from './middlewares';
import { initRoutes } from './route';
import { newMongoDB } from './db';
dotenv.config();

const app = express();
const port = process.env.HTTP_PORT || 3000;

const run = async () => {
    const db = await newMongoDB();

    initMiddlewares(app);
    initRoutes(app, db);

    app.listen(port, () => {
        console.log(`Server is running at ::${port}`);
    });
}

run();


