import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { TaskService } from './task.service';
import { GlobalStateService } from './global-state.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionalityService {
  private _functionalities: BehaviorSubject<Functionality[]> =
    new BehaviorSubject<Functionality[]>([
      {
        functionality_ID: 0,
        functionality_name: 'Example Functionality 1',
        functionality_description: 'This is an example functionality 1.',
        functionality_priority: 1,
        functionality_projectId: 1,
        functionality_ownerId: 1,
        functionality_state: 'TODO',
      },
      {
        functionality_ID: 1,
        functionality_name: 'Example Functionality 2',
        functionality_description: 'This is an example functionality 2.',
        functionality_priority: 1,
        functionality_projectId: 1,
        functionality_ownerId: 1,
        functionality_state: 'TODO',
      }
    ]);

  private functionalities$: Observable<Functionality[]> =
    this._functionalities.asObservable();

  constructor(
    private taskService: TaskService,
    private globalState: GlobalStateService
  ) {}

  getAllFunctionalities(): Observable<Functionality[]> {
    return this.functionalities$;
  }

  getAllWorkingFunctionalities() {
    return this.functionalities$.pipe(
      switchMap((data) => {
        return this.globalState.workingProject$.pipe(
          map((workingProjectId) => {
            return data.filter(
              (func) => func.functionality_projectId === workingProjectId
            );
          })
        );
      })
    );
  }

  getFunctionality(id: number) {
    return this._functionalities
      .getValue()
      .find((func) => func.functionality_ID === id);
  }

  createFunctionality(newFunctionality: Functionality) {
    this._functionalities.getValue().push(newFunctionality);
  }

  updateFunctionality(id: number, functionality: Functionality) {
    if (id !== functionality.functionality_ID) {
      return;
    }

    const index: number = this._functionalities
      .getValue()
      .findIndex((item) => item.functionality_ID === id);
    this._functionalities.getValue()[index] = functionality;
    this._functionalities.next(this._functionalities.getValue());
  }

  deleteFunctionality(id: number) {
    const index: number = this._functionalities
      .getValue()
      .findIndex((item) => item.functionality_ID === id);
    if (index < 0) {
      return;
    }
    this._functionalities.getValue().splice(index, 1);
    this._functionalities.next(this._functionalities.getValue());

    this.taskService
      .getRelatedFunctionalityTasks(id)
      .pipe(map((data) => data.map((task) => task.task_ID)))
      .subscribe((data) => {
        for (const taskId of data) {
          this.taskService.deleteTask(taskId);
        }
      })
      .unsubscribe();
  }
}
