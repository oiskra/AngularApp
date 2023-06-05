import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private _workingProject: ReplaySubject<number> = new ReplaySubject(1);
  public workingProject$: Observable<number> = this._workingProject.asObservable();

  constructor() {
    this._workingProject.next(-1);
  }

  setWorkingProject(id: number) {
    this._workingProject.next(id);
  }
}
