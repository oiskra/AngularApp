import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  protected displayedColumns: string[] = ['Name', 'Surname', 'Role', 'Edit', 'Delete'];
  protected users$!: Observable<User[]>;

  constructor(private router: Router, 
    private userService: UserService) {}

  ngOnInit(): void {    
    this.users$ = this.userService.getAllUsers();
  }

  onEditUserClick(id: number) {
    this.router.navigateByUrl(`/users/edit/${id}`)
  }

  onUserClick(id: number) {
    this.router.navigateByUrl(`/users/details/${id}`);
  }

  onDeleteUserClick(id: number) {
    this.userService.deleteUser(id);
  }
}
