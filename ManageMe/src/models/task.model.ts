import { Functionality } from "./functionality.model";

export type Task = {
    name: string;
    description: string;
    priority: number;
    functionality: Functionality;
}