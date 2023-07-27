import cors from 'cors';
import express from 'express';

export const initMiddlewares = (app: express.Express) => {
    app.use(express.json());
    app.use(cors({ origin: '*' }));
}