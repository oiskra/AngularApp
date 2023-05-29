import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  protected displayedColumns: string[] = ['Name', 'Surname', 'Role', 'Edit', 'Delete'];
  protected users!: User[]

  constructor(private router: Router, 
    protected userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = [...data];      
    })
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
