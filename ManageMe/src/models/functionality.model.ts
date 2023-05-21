import { Project } from "./project.model";
import { State } from "./state.model";
import { User } from "./user.model";

export type Functionality = {
    name: string;
    description: string;
    priority: number;
    projekt: Project;
    owner: User;
    state: State;
}