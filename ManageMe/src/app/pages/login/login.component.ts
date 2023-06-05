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
    login: ['', Validators.required, this.loginNotTaken()],
    password: ['', Validators.compose([
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'))
    ])]
  })

  private registerFormSub$!: Subscription;
  private loginFormSub$!: Subscription;

  constructor(private auth: AuthService, 
    private fb: FormBuilder, 
    private router: Router,
    private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.registerFormSub$ = this.registerForm.statusChanges.subscribe();
    this.loginFormSub$ = this.loginForm.statusChanges.subscribe();     
  }

  ngOnDestroy(): void {
    this.registerFormSub$.unsubscribe();
    this.loginFormSub$.unsubscribe();
  }

  async onRegisterSubmit() {
    const {value} = this.registerForm;

    const registerSuccess = await this.auth.register(
      value.login!,
      value.password!,
      value.name!,
      value.surname!
    );

    if(!registerSuccess) {
      this.snackBar.open('Register failed', 'Close', {
        duration: 2000
      });
      return;
    }

    const sb = this.snackBar.open('Register successful!', 'Log In', {duration: 3000});
    sb.onAction().subscribe(async () => {
      sb.dismiss();
      await this.auth.login(value.login!, value.password!)
        .then((success) => success && this.router.navigateByUrl('/projects'));
    });
  }

  async onLoginSubmit() {
    const {value} = this.loginForm;
    
    const loginSuccess = await this.auth.login(value.login!, value.password!);

    if(!loginSuccess) {
      this.snackBar.open('Login failed', 'Close', {
        duration: 2000
      });
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

      return this.auth.checkLogin(control);
    }
  }
}
