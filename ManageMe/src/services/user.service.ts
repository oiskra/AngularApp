import { Injectable } from '@angular/core';
import { Role, User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: User[] = [
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
    
  ];

  constructor() { }

  getAllUsers(): User[] { 
    return this._users;
  }
}
