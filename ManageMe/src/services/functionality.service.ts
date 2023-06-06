import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { TaskService } from './task.service';
import { GlobalStateService } from './global-state.service';


@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  private _functionalities: BehaviorSubject<Functionality[]> = new BehaviorSubject<Functionality[]>([
    {
      functionality_ID: 0,
      functionality_name: 'functionality0',
      functionality_description: 'desc0',
      functionality_priority: 1,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: 'TODO'
    },
    {
      functionality_ID: 1,
      functionality_name: 'functionality1',
      functionality_description: 'desc1',
      functionality_priority: 1,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: 'TODO'
    },
    {
      functionality_ID: 2,
      functionality_name: 'functionality2',
      functionality_description: 'desc2',
      functionality_priority: 1,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: 'TODO'
    },
    {
      functionality_ID: 3,
      functionality_name: 'Example Functionality',
      functionality_description: 'This is an example functionality.',
      functionality_priority: 2,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: 'TODO'
    }
  ]);

  private functionalities$: Observable<Functionality[]> = this._functionalities.asObservable();

  constructor(
    private taskService: TaskService, 
    private globalState: GlobalStateService) {
    this._functionalities.getValue().forEach(func => {
      this.taskService.getRelatedFunctionalityTasks(func.functionality_ID).subscribe(data => {
        const clone = {...func}
        if(data.every(task => task.task_state === 'TODO')) {
            clone.functionality_state = 'TODO';
            this.updateFunctionality(func.functionality_ID, clone);
        } else if(data.some(task => task.task_state === 'DOING')) {
            clone.functionality_state = 'DOING';
            this.updateFunctionality(func.functionality_ID, clone);
        } else if(data.every(task => task.task_state === 'DONE')){
            clone.functionality_state = 'DONE';
            this.updateFunctionality(func.functionality_ID, clone);
        }     
      })
    })   
  }

  getAllFunctionalities(): Observable<Functionality[]> {
    return this.functionalities$;
  }

  getAllWorkingFunctionalities() {
    return this.functionalities$.pipe(
      switchMap((data) => {
        return this.globalState.workingProject$.pipe(
          map(workingProjectId => {
            return data.filter(func => func.functionality_projectId === workingProjectId)
          })
        )
      })
    );
  }

  getFunctionality(id: number) {
    return this._functionalities.getValue().find(func => func.functionality_ID === id)
  }

  createFunctionality(newFunctionality: Functionality) {
    this._functionalities.getValue().push(newFunctionality);
  }

  updateFunctionality(id: number, functionality: Functionality) {
    if(id !== functionality.functionality_ID) {
      return;
    }

    const index: number = this._functionalities.getValue().findIndex(item => item.functionality_ID === id)
    this._functionalities.getValue()[index] = functionality;
  }

  deleteFunctionality(id: number) {
    const index: number = this._functionalities.getValue().findIndex((item) => item.functionality_ID === id);
    if(index < 0) {
      return;
    }
    this._functionalities.getValue().splice(index, 1);
    this._functionalities.next(this._functionalities.getValue());

    this.taskService.getRelatedFunctionalityTasks(id)
      .pipe(
        map(data => data.map(task => task.task_ID))
      )
      .subscribe(data => {
        for (const taskId of data) {
          this.taskService.deleteTask(taskId);
        }
      }).unsubscribe();
  }
}
