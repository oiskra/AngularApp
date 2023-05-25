import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { State } from 'src/models/state.model';

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
      functionality_state: 'DOING'
    },
    {
      functionality_ID: 3,
      functionality_name: 'Example Functionality',
      functionality_description: 'This is an example functionality.',
      functionality_priority: 2,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: 'DONE'
    }
  ]);

  private functionalities$: Observable<Functionality[]> = this._functionalities.asObservable();

  constructor() { }

  getAllFunctionalities(): Observable<Functionality[]> {
    return this.functionalities$;
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
    this._functionalities.next(this._functionalities.getValue())
  }
}
