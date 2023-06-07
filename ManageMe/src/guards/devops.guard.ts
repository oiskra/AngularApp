import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DevopsGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
      return this.auth.loggedUser$.pipe(
        map((loggedUser) => {
          if(!loggedUser) {
            return false;
          }
  
          return loggedUser.user_role === Role.DEVOPS || loggedUser.user_role === Role.ADMIN;
        }));
  }
  
}
