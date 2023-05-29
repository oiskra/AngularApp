import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Role, User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private selectedId!: number;
  public selectedUser?: User;
  protected editForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    role: ['', Validators.required]
  });
  
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private userService: UserService,
    private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.selectedId = Number(param['id']);
      this.selectedUser = this.userService.getUser(this.selectedId);
    })

    this.editForm.setValue({
      name: this.selectedUser?.user_name!,
      surname: this.selectedUser?.user_surname!,
      role: this.selectedUser?.user_role!
    })
  }

  onSubmit() {
    const {value} = this.editForm;

    this.userService.updateUser(this.selectedId, {
      user_id: this.selectedId,
      user_name: value.name!,
      user_surname: value.surname!,
      user_role: value.role! as Role,
      user_login: this.selectedUser?.user_login!,
      user_password: this.selectedUser?.user_password!
    })

    const snackbar = this.snackBar.open('User edited successfully')

    setTimeout(() => snackbar.dismiss(), 2000)
  }
}