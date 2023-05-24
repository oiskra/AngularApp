import { State } from "./state.model";

export type Functionality = {
    functionality_ID: number;
    functionality_name: string;
    functionality_description: string;
    functionality_priority: number;
    functionality_projectId: number;
    functionality_ownerId: number;
    functionality_state: State;
}