import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private _workingProject: ReplaySubject<number> = new ReplaySubject(1);
  public workingProject$: Observable<number> = this._workingProject.asObservable();
  public static NOT_SELECTED_PROJECT: number = -1;

  constructor() {
    this._workingProject.next(GlobalStateService.NOT_SELECTED_PROJECT);
  }

  setWorkingProject(id: number) {
    this._workingProject.next(id);
  }
}
