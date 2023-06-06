import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Task } from 'src/models/task.model';
import { FunctionalityService } from './functionality.service';

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
      task_finishedAt: undefined,
      task_startedAt: undefined,
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
      task_finishedAt: undefined,
      task_startedAt: undefined,
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
      task_finishedAt: undefined,
      task_startedAt: undefined,
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_assignedEmployeeId: 0
    },
    {
      task_ID: 3,
      task_name: "Implement logout functionality",
      task_description: "1Develop the login feature for the application",
      task_priority: 3,
      task_functionalityId: 1,
      task_durationInHours: 2,
      task_state: 'TODO',
      task_finishedAt: undefined,
      task_startedAt: undefined,
      task_addedAt: new Date("2023-05-02T10:00:00Z"),
      task_assignedEmployeeId: 0
    },
  ]);

  private tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor(private injector: Injector) {}

  getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getAllWorkingTasks(): Observable<Task[]> {
    const functionalityService = this.injector.get(FunctionalityService);
    return this.tasks$.pipe(
      switchMap(tasks => {
        return functionalityService.getAllWorkingFunctionalities().pipe(
          map(funcs => funcs.map(func => func.functionality_ID)),
          map(funcIds => {
            return tasks.filter(task => funcIds.some(id => id === task.task_functionalityId))
          })
        )        
      })
    );
  }
  
  getRelatedFunctionalityTasks(functionalityId: number): Observable<Task[]> {
    return this.tasks$.pipe(map(
      tasks => tasks.filter(task => task.task_functionalityId === functionalityId)
    ));
  }

  getTask(id: number) : Task | undefined {
    return this._tasks.getValue().find(task => task.task_ID === id)
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

  deleteTask(id: number) {
    const index: number = this._tasks.getValue().findIndex((item) => item.task_ID === id);
    if(index < 0) {
      return;
    }
    this._tasks.getValue().splice(index, 1);
    this._tasks.next(this._tasks.getValue())
  }
}
