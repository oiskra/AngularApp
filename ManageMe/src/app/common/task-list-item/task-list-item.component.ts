import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent {

  @Input() task!: Task; 

  constructor(private router: Router, private taskService: TaskService) {}

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
