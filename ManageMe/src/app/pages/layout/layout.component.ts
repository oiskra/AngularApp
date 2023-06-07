import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  protected userLoggedIn$!: Observable<boolean>;
  protected currentUser$?: Observable<User | undefined>;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() : void {    
    this.userLoggedIn$ = this.auth.isUserLoggedIn$;
    this.currentUser$ = this.auth.loggedUser$;
  }

  onLogoutClick() {
    this.auth.logout();
    this.router.navigateByUrl('(auth:auth/login)')
  }
}
