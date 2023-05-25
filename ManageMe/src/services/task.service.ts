import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from 'src/models/state.model';
import { Task } from 'src/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([
    {
      task_ID: 0,
      task_name: "Implement login functionality",
      task_description: "Develop the login feature for the application",
      task_priority: 2,
      task_functionalityId: 0,
      task_durationInHours: 4,
      task_state: 'DONE',
      task_addedAt: new Date("2023-05-20T10:00:00Z"),
      task_startedAt: new Date("2023-05-21T09:00:00Z"),
      task_finishedAt: new Date("2023-05-22T15:30:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 0,
      task_name: "Implement auth functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 0,
      task_durationInHours: 2,
      task_state: 'DOING',
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_startedAt: new Date("2023-05-21T09:00:00Z"),
      task_finishedAt: new Date("2023-05-22T15:30:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 0,
      task_name: "Implement register functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 0,
      task_durationInHours: 2,
      task_state: 'TODO',
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_startedAt: new Date("2023-05-21T09:00:00Z"),
      task_finishedAt: new Date("2023-05-22T15:30:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 0,
      task_name: "Implement logout functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 0,
      task_durationInHours: 2,
      task_state: 'TODO',
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_startedAt: new Date("2023-05-21T09:00:00Z"),
      task_finishedAt: new Date("2023-05-22T15:30:00Z"),
      task_assignedEmployeeId: 0
    },
  ]);

  private tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }
}
