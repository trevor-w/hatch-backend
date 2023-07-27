
import express from 'express';
import { addTask, deleteAllTasks, listTasks, updateTaskStatus } from './handlers/task';
import { Db } from 'mongodb';
export const initRoutes = (app: express.Express, db: Db) => {
    app.get('/tasks', (req, res) => listTasks(req, res, db));
    app.post('/tasks', (req, res) => addTask(req, res, db));
    app.patch('/tasks/:id', (req, res) => updateTaskStatus(req, res, db));
    app.delete('/tasks', (req, res) => deleteAllTasks(req, res, db))
}