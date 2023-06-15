import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.auth.loggedUser$.pipe(map((user) => {
        if(!user) {
          this.router.navigateByUrl('/(auth:auth/login)')
          return false;
        }

        if(user.user_role === Role.ADMIN) {return true;}

        const paramID = route.params?.['id'];
        if(paramID && route.url[0].path === 'users') {
          const canAccess = user.user_id === parseInt(paramID);
          !canAccess && this.router.navigateByUrl('/');
          return canAccess;
        }
        
        return true;
      }));
  }
  
}
