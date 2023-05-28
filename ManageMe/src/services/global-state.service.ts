import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private _workingProject: Subject<number> = new Subject();
  public workingProject$: Observable<number> = this._workingProject.asObservable();

  private _currentUser: Subject<User> = new Subject();
  public currentUser$: Observable<User> = this._currentUser.asObservable();

  constructor() { }

  setWorkingProject(id: number) {
    this._workingProject.next(id);
  }

  setCurrentUser(user: User) {
    this._currentUser.next(user);
  }
}
