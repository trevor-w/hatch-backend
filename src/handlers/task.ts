import { Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';
import { Collections } from '../enums/collection';
import { HttpStatus } from '../enums/httpstatus';
import { TaskStatus } from '../enums/task';
import { Task } from '../interfaces/task';

const defaultDoneListLimit = 10

export const listTasks = async (req: Request, res: Response, db: Db) => {
    try {
        const toDoTask = await db.collection(Collections.TASK).find({ status: TaskStatus.TODO }).toArray();
        const doneList = await db.collection(Collections.TASK).find({ status: TaskStatus.DONE }).sort({ "createdAt": -1 }).limit(defaultDoneListLimit).toArray();
        const result = [...toDoTask, ...doneList].map(task => {
            return { ...task, id: task._id };
        });
        res.status(HttpStatus.OK).json(result);
    }
    catch (err) {
        res.status(HttpStatus.InternalServerError).json({ code: HttpStatus.InternalServerError, message: err });
    }

}

export const addTask = async (req: Request, res: Response, db: Db) => {
    let task = req.body as Task;
    task.createdAt = new Date().getTime();
    try {
        const result = await db.collection(Collections.TASK).insertOne(task);
        res.status(HttpStatus.OK).json({ ...task, id: result.insertedId });
    }
    catch (err) {
        res.status(HttpStatus.InternalServerError).json({ code: HttpStatus.InternalServerError, message: err });
    }
}

export const updateTaskStatus = async (req: Request, res: Response, db: Db) => {
    const taskID = req.params.id;
    const { status } = req.body;
    try {
        const result = await db.collection(Collections.TASK).updateOne({ _id: ObjectId.createFromHexString(taskID) }, { $set: { status: status } });
        res.status(HttpStatus.OK).json({ timestamp: new Date().getTime() });
    }
    catch (err) {
        res.status(HttpStatus.InternalServerError).json({ code: HttpStatus.InternalServerError, message: err });
    }

}

export const deleteAllTasks = async (req: Request, res: Response, db: Db) => {
    try {
        const tasks = await db.collection(Collections.TASK).deleteMany();
        res.status(HttpStatus.OK).json({ timestamp: new Date().getTime() });
    }
    catch (err) {
        res.status(HttpStatus.InternalServerError).json({ code: HttpStatus.InternalServerError, message: err });
    }
}