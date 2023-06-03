import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
      return this.auth.isUserLoggedIn$.pipe(map((isLogged) => {
        if(!isLogged) {
          this.router.navigateByUrl('/(auth:auth/login)')
          return false;
        }

        return true;
      }));
  }
  
}
