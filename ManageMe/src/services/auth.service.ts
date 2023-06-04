import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Role, User } from 'src/models/user.model';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable, find, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this._isUserLoggedIn.asObservable();
  private _loggedUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  loggedUser$: Observable<User | undefined> = this._loggedUser.asObservable();

  private users$;


  constructor(private userService: UserService) {
    this.users$ = this.userService.getAllUsers();
  }

  register(
    login: string, 
    password: string, 
    name: string, 
    surname: string,
    users: User[]
  ) {

    if(users.find(user => user.user_login === login)) {
      return false;
    }

    const newUser: User = {
      user_id: Date.now(),
      user_login: login,
      user_password: password,
      user_name: name,
      user_surname: surname,
      user_role: Role.DEVELOPER
    } 

    this.userService.createUser(newUser);
    return true; 
  }

  login(login: string, password: string, users: User[]) {
    
    const user: User | undefined = users.find(user => {
      const loginPair = user.user_login == login;
      const passwordPair = user.user_password == password;

      return loginPair && passwordPair;
    })          

    if(!user) {
      return false;
    }
    
    this._isUserLoggedIn.next(true);          
    this._loggedUser.next(user);
    return true;  

  }

  logout() {
    this._loggedUser.next(undefined);
    this._isUserLoggedIn.next(false)
  }

  resetPassword() {

  }

  checkLogin(control: AbstractControl, users: User[]) {
    
    const loginTaken: boolean = users.some(user => user.user_login === control.value);

    if(loginTaken) {
      return {loginTaken:true};
    }

    return null;
  }

}
