import { State } from "./state.model";

export type Task = {
    task_ID: number;
    task_name: string;
    task_description: string;
    task_priority: number;
    task_functionalityId: number;
    task_durationInHours: number;
    task_state: State;
    task_addedAt: Date;
    task_startedAt?: Date; 
    task_finishedAt?: Date;
    task_assignedEmployeeId: number;
}