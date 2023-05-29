import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Role, User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false
  loggedUser?: User;

  
  constructor(private userService: UserService) { }

  register(
    login: string, 
    password: string, 
    name: string, 
    surname: string
  ) {

    this.userService.getAllUsers().subscribe(data => {

      if(data.find(user => user.user_login === login)) {
        throw Error('Register failed')
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
    }).unsubscribe()
  }

  login(login: string, password: string) {
    this.userService.getAllUsers().subscribe(data => {
      const user: User | undefined = data.find(user => {
        const loginPair = user.user_login === login;
        const passwordPair =user.user_password === password;

        return loginPair && passwordPair;
      })

      if(user) {
        this.isUserLoggedIn = true;
        this.loggedUser = user;
        return;
      }

      throw Error('Login failed')
      
    }).unsubscribe();
  }

  logout() {
    this.loggedUser = undefined;
    this.isUserLoggedIn = false;
  }

  resetPassword() {

  }

}
