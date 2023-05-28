import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {

  protected taskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['', Validators.required],
    relatedFunctionality: ['', Validators.required],
    duration: ['', Validators.required]
  })

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder, 
    private router: Router) {}


  onSubmit() {
    const {value} = this.taskForm;

    const newTask: Task = {
      task_ID: Date.now(),
      task_name: value.name!,
      task_description: value.description!,
      task_priority: Number(value.priority!),
      task_functionalityId: Number(value.relatedFunctionality!),
      task_durationInHours: Number(value.duration!),
      task_state: 'TODO',
      task_addedAt: new Date(Date.now()),
      task_startedAt: undefined, 
      task_finishedAt: undefined,
      task_assignedEmployeeId: 1
    }

    this.taskService.createTask(newTask); 
    this.router.navigateByUrl('/tasks')   
  }

}
