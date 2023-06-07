import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Role, User } from 'src/models/user.model';
import { GlobalStateService } from './global-state.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIdLocalStorageExists: boolean = localStorage.getItem('logged') !== null;
  private _isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loggedIdLocalStorageExists);
  isUserLoggedIn$: Observable<boolean> = this._isUserLoggedIn.asObservable();
  private _loggedUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(
    this.loggedIdLocalStorageExists ? this.userService.getUser(Number(localStorage.getItem('logged')!)) : undefined
  );
  loggedUser$: Observable<User | undefined> = this._loggedUser.asObservable();

  constructor(
    private userService: UserService,
    private globalState: GlobalStateService) {}

  async register(
    login: string, 
    password: string, 
    name: string, 
    surname: string
  ) : Promise<boolean>{

    return new Promise((resolve) => {
      this.userService.getAllUsers()
        .pipe(take(1))
        .subscribe(data => {
          if(data.find(user => user.user_login === login)) {
            resolve(false);
            return;
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

    return new Promise((resolve) => {
      this.userService.getAllUsers().subscribe(data => {

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
        localStorage.setItem('logged', JSON.stringify(user.user_id));
        resolve(true);  
      }).unsubscribe();
    })

  }

  logout() {
    localStorage.removeItem('logged');
    this._loggedUser.next(undefined);
    this._isUserLoggedIn.next(false)
    this.globalState.setWorkingProject(GlobalStateService.NOT_SELECTED_PROJECT);
  }

  resetPassword() {

  }

  async checkLogin(control: AbstractControl) {
    return new Promise((resolve) => {
      this.userService.getAllUsers().subscribe(data => {

        const loginTaken: boolean = data.some(user => user.user_login === control.value);
  
        if(loginTaken) {
          resolve({loginTaken:true})
          return; 
        }
    
        resolve(null);
      }).unsubscribe();
    })
    
  }

}
