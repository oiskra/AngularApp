import { Injectable } from '@angular/core';
import { Functionality } from 'src/models/functionality.model';
import { State } from 'src/models/state.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  private _functionalities: Functionality[] = [
    {
      functionality_ID: 0,
      functionality_name: 'functionality0',
      functionality_description: 'desc0',
      functionality_priority: 1,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: State.TODO
    },
    {
      functionality_ID: 1,
      functionality_name: 'functionality1',
      functionality_description: 'desc1',
      functionality_priority: 1,
      functionality_projectId: 1,
      functionality_ownerId: 1,
      functionality_state: State.TODO
    },
  ]

  constructor() { }

  getAllFunctionalities(): Functionality[] {
    return this._functionalities;
  }
}
