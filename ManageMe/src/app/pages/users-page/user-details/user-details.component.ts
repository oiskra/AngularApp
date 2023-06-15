import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private selectedId!: number;
  protected selectedUser?: User;
  protected relatedTasks$?: Observable<Task[]>;
  private routeSub$!: Subscription;

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params) => {
      this.selectedId = Number(params['id']);
      this.selectedUser = this.userService.getUser(this.selectedId);
    });

    this.relatedTasks$ = this.taskService.getAllTasks().pipe(map(data => {
      return data.filter(task => task.task_assignedEmployeeId === this.selectedId)
    }));
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  onEditButtonClick() {
    this.router.navigateByUrl('/users/edit/' + this.selectedId);
  }
}
