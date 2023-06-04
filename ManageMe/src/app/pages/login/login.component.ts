import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  protected loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })
  
  protected registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    login: ['', Validators.compose([Validators.required, this.loginNotTaken()])],
    password: ['', Validators.compose([
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'))
    ])]
  })

  private users: User[] = []
  private usersSub$!: Subscription

  private registerFormSub$!: Subscription;
  private loginFormSub$!: Subscription;

  constructor(private auth: AuthService, 
    private fb: FormBuilder, 
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService) {}
  
  ngOnInit(): void {
    this.registerFormSub$ = this.registerForm.statusChanges.subscribe();
    this.loginFormSub$ = this.loginForm.statusChanges.subscribe(); 
    this.usersSub$ = this.userService.getAllUsers().subscribe(users => {
      console.log('login init', users);
      
      this.users = [...users];
    })    
  }

  ngOnDestroy(): void {
    this.registerFormSub$.unsubscribe();
    this.loginFormSub$.unsubscribe();
    this.usersSub$.unsubscribe();
  }

  onRegisterSubmit() {
    const {value} = this.registerForm;

    const res = this.auth.register(
      value.login!,
      value.password!,
      value.name!,
      value.surname!,
      this.users
    )

    if(!res) {
      this.snackBar.open('Register failed', 'Close', {
        duration: 2000
      })
      return;
    }
  }

  onLoginSubmit() {
    const {value} = this.loginForm;
    
    const res = this.auth.login(value.login!, value.password!, this.users)

    if(!res) {
      this.snackBar.open('Login failed', 'Close', {
        duration: 2000
      })
      return;
    }

    this.router.navigateByUrl('/projects');
  }

  private loginNotTaken() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }

      return this.auth.checkLogin(control, this.users);
    }
  }
}
