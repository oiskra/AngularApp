import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { FunctionalityService } from 'src/services/functionality.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  protected routeSub$!: Subscription
  protected selectedId!: number
  protected selectedTask?: Task
  protected details = {
    employee: '',
    functionality: ''
  }

  constructor(private route: ActivatedRoute, 
    private taskService: TaskService, 
    private userService: UserService,
    private functionalityService: FunctionalityService) {}
  
  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params) => {
      this.selectedId = Number(params['id']);
    }); 
    
    this.selectedTask = this.taskService.getTask(this.selectedId);

    const user = this.userService.getUser(this.selectedTask?.task_assignedEmployeeId!);
    this.details.employee = user?.user_name + ' ' + user?.user_surname;

    const functionality = this.functionalityService.getFunctionality(this.selectedTask?.task_functionalityId!)
    this.details.functionality = functionality?.functionality_name!
  }

  startedAt() {
    if(!this.selectedTask?.task_startedAt) {return 'NOT STARTED';}

    return this.selectedTask.task_startedAt.toLocaleString();
  }

  finishedAt() {
    if(!this.selectedTask?.task_finishedAt) {return 'NOT FINISHED';}

    return this.selectedTask?.task_finishedAt.toLocaleString();
  }
}
