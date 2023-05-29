import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role, User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    {
      user_id: 0,
      user_login: "johndoe",
      user_password: "password123",
      user_name: "John",
      user_surname: "Doe",
      user_role: Role.DEVELOPER,
    },
    {
      user_id: 1,
      user_login: "janedoe",
      user_password: "password123",
      user_name: "Jane",
      user_surname: "Doe",
      user_role: Role.DEVOPS,
    }
    
  ]);

  private users$: Observable<User[]> = this._users.asObservable();

  constructor() { }

  getAllUsers(): Observable<User[]> { 
    return this.users$;
  }

  getUser(id: number) {
    return this._users.getValue().find(user => user.user_id === id)
  }

  deleteUser(id: number) {
    const index: number = this._users.getValue().findIndex((item) => item.user_id === id);
    if(index < 0) {
      return;
    }
    this._users.getValue().splice(index, 1);
    this._users.next(this._users.getValue())
  }
}
