import { Functionality } from "./functionality.model";
import { State } from "./state.model";
import { User } from "./user.model";

export type Task = {
    name: string;
    description: string;
    priority: number;
    functionality: Functionality;
    estimatedTimeOfCompletion: string;
    state: State;
    addedAt: Date;
    startedAt: Date; //stan zmieniony na doing
    finishedAt: Date; //stan zmieniony na done
    assignedEmployee: User;
}