import { Functionality } from "./functionality.model";
import { State } from "./state.model";
import { User } from "./user.model";

export type Task = {
    task_ID: number;
    task_name: string;
    task_description: string;
    task_priority: number;
    task_functionalityId: number;
    task_durationInHours: number;
    task_state: State;
    task_addedAt: Date;
    task_startedAt?: Date; //stan zmieniony na doing
    task_finishedAt?: Date; //stan zmieniony na done
    task_assignedEmployeeId: number;
}