import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Role, User } from 'src/models/user.model';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this._isUserLoggedIn.asObservable();
  private _loggedUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  loggedUser$: Observable<User | undefined> = this._loggedUser.asObservable();

  
  constructor(private userService: UserService) { }

  async register(
    login: string, 
    password: string, 
    name: string, 
    surname: string
  ): Promise<boolean> {

    return new Promise<boolean>(resolve => {
      this.userService.getAllUsers().subscribe(data => {

        if(data.find(user => user.user_login === login)) {
          resolve(false);
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
        resolve(true);
  
      }).unsubscribe();
    })
    
  }

  async login(login: string, password: string): Promise<boolean> {

    return new Promise<boolean>(resolve => {
        this.userService.getAllUsers()
        .subscribe(data => {
          
          const user: User | undefined = data.find(user => {
            const loginPair = user.user_login == login;
            const passwordPair = user.user_password == password;
  
            return loginPair && passwordPair;
          })          
  
          if(!user) {
            resolve(false);
            return;
          }
          
          this._isUserLoggedIn.next(true);          
          this._loggedUser.next(user);
          resolve(true);
        }).unsubscribe();
      });
  }

  logout() {
    this._loggedUser.next(undefined);
    this._isUserLoggedIn.next(false)
  }

  resetPassword() {

  }

  checkLogin(control: AbstractControl) {
    const loginTaken = new Promise(resolve => {
      this.userService.getAllUsers().subscribe((data) => {
        const loginTaken: boolean = data.some(user => user.user_login === control.value);

        if(loginTaken) {
          resolve({loginTaken:true});
          return;
        }

        resolve(null)
      })
    }).then(res => res);

    return loginTaken
  }

}
