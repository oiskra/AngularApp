import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, mergeAll, switchAll, switchMap } from 'rxjs';
import { Role, User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([
    {
      user_id: 0,
      user_login: "johndoe",
      user_password: "password123",
      user_name: "John",
      user_surname: "Doe",
      user_role: 'developer' as Role,
    },
    {
      user_id: 1,
      user_login: "janedoe",
      user_password: "password123",
      user_name: "Jane",
      user_surname: "Doe",
      user_role: 'devops' as Role,
    },
    {
      user_id: 3,
      user_login: "admin",
      user_password: "admin",
      user_name: "Ad",
      user_surname: "Min",
      user_role: 'admin' as Role,
    }
    
  ]);


  private users$: Observable<User[]> = this._users.asObservable();


  constructor() {}

  getAllUsers() { 
    console.log('user service getAll', this._users.getValue());   
    return this.users$;
  }

  getUser(id: number) {
    return this._users.getValue().find(user => user.user_id === id)
  }

  createUser(user: User) {        
    const currentUsersArr = this._users.value;
    const updatedUsersArr = [...currentUsersArr, user];    
    this._users.next(updatedUsersArr);
    console.log('createUser func', this._users.value);
  }

  updateUser(id: number, user: User) {
    if(id !== user.user_id) {
      return;
    }

    const index: number = this._users.getValue().findIndex(item => item.user_id === id)
    this._users.getValue()[index] = user;
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
