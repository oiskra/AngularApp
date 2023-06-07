import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.loggedUser$.pipe(
      map((loggedUser) => {
        if(!loggedUser) {
          return false;
        }

        return loggedUser.user_role === Role.ADMIN;
      }));
  }
  
}
