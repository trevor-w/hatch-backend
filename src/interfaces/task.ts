import { TaskStatus } from "../enums/task"


export interface Task {
    id: string
    title: string
    status: TaskStatus
    createdAt: number
}