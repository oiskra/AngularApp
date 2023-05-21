import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static _users: User[] = [];

  constructor() { }
}
