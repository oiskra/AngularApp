import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task.model';
import { Role } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  protected loggedUserTask!: boolean
  protected devopsRole!: boolean

  @Input() task!: Task; 

  constructor(private router: Router, private taskService: TaskService, private auth: AuthService) {}
  
  ngOnInit(): void {
    this.auth.loggedUser$.subscribe(user => {
      this.devopsRole = user?.user_role === Role.DEVOPS;
      this.loggedUserTask = this.task.task_assignedEmployeeId === user?.user_id;
    })
  }

  onDetailsClick(id: number) {
    this.router.navigateByUrl('tasks/details/' + id)
  }

  onEditClick(id: number) {
    this.router.navigateByUrl('tasks/edit/' + id)
  }

  onDeleteClick(id: number) {
    this.taskService.deleteTask(id);
  }
}
