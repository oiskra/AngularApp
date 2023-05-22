import { Project } from "./project.model";
import { State } from "./state.model";
import { User } from "./user.model";

export type Functionality = {
    id: number;
    name: string;
    description: string;
    priority: number;
    projectId: number;
    ownerId: number;
    state: State;
}