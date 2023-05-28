import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
      task_state: 'TODO',
      task_addedAt: new Date("2023-05-20T10:00:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 1,
      task_name: "Implement auth functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 0,
      task_durationInHours: 2,
      task_state: 'TODO',
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 2,
      task_name: "Implement register functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 0,
      task_durationInHours: 2,
      task_state: 'TODO',
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 3,
      task_name: "Implement logout functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 0,
      task_durationInHours: 2,
      task_state: 'TODO',
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_assignedEmployeeId: 0
    },
  ]);

  private tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getRelatedFunctionalityTasks(functionalityId: number): Observable<Task[]> {
    return this.tasks$.pipe(map(
      tasks => tasks.filter(task => task.task_functionalityId === functionalityId)
    ));
  }

  createTask(task: Task) {
    this._tasks.getValue().push(task);
  }

  updateTask(id: number, task: Task) {
    if(id !== task.task_ID) {
      return;
    }
    const index: number = this._tasks.getValue().findIndex(task => task.task_ID === id)
    this._tasks.getValue()[index] = task;
    this._tasks.next(this._tasks.getValue())
  }
}
