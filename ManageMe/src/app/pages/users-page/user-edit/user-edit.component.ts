import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role, User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  private selectedId!: number;
  public selectedUser?: User;
  private paramSub$!: Subscription;
  protected editForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    role: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.compose([
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'))
    ])]
  });
  
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private userService: UserService,
    private snackBar: MatSnackBar,
    private auth: AuthService) {}
  
  ngOnInit(): void {
    this.paramSub$ = this.activeRoute.params.subscribe(param => {
      this.selectedId = Number(param['id']);
      this.selectedUser = this.userService.getUser(this.selectedId);
    });

    this.editForm.setValue({
      name: this.selectedUser?.user_name!,
      surname: this.selectedUser?.user_surname!,
      role: this.selectedUser?.user_role!,
      login: this.selectedUser?.user_login!,
      password: this.selectedUser?.user_password!
    });

    this.auth.loggedUser$.subscribe(user => {
      if(user?.user_role !== Role.ADMIN){
        this.editForm.get('role')?.disable();
      }
    }).unsubscribe();
  }

  ngOnDestroy(): void {
    this.paramSub$.unsubscribe();
  }

  onSubmit() {
    const {value} = this.editForm;

    this.userService.updateUser(this.selectedId, {
      user_id: this.selectedId,
      user_name: value.name!,
      user_surname: value.surname!,
      user_role: value.role! as Role,
      user_login: value.login!,
      user_password: value.password!
    });

    this.snackBar.open('User edited successfully', undefined, {duration: 2000});
  }
}
