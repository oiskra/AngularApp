import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private isLoggedSub$!: Subscription;
  private loggedUserSub$!: Subscription;
  protected userLoggedIn!: boolean;
  protected currentUser?: User;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() : void {    
    this.isLoggedSub$ = this.auth.isUserLoggedIn$.subscribe(data => {
      this.userLoggedIn = Boolean(data);
    })

    this.loggedUserSub$ = this.auth.loggedUser$.subscribe(data => {
      this.currentUser = data;
    })
  }

  onLogoutClick() {
    this.auth.logout();
    this.router.navigateByUrl('(auth:auth/login)')
  }
}
