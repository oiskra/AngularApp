import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  protected displayedColumns: string[] = ['Name', 'Surname', 'Role', 'Edit', 'Delete'];
  protected users!: User[];
  private usersSub$!: Subscription

  constructor(private router: Router, 
    private userService: UserService) {}

  ngOnInit(): void {    
    this.usersSub$ = this.userService.getAllUsers().subscribe(data => {
      this.users = [...data];      
    })
  }
  
  ngOnDestroy(): void {    
    this.usersSub$.unsubscribe();
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
