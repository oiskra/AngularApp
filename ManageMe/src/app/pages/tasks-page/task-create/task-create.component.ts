import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit{

  protected taskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: [1, Validators.required],
    relatedFunctionality: ['', Validators.required],
    duration: ['', Validators.required]
  })
  private currentUserSub$!: Subscription;
  private currentUser?: User;

  

  constructor(
    private auth: AuthService,
    private taskService: TaskService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.currentUserSub$ = this.auth.loggedUser$.subscribe(data => {
      this.currentUser = {...data!};
    })
  }

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
      task_assignedEmployeeId: this.currentUser?.user_id!
    }

    this.taskService.createTask(newTask); 
    this.router.navigateByUrl('/tasks')   
    const snackbar = this.snackBar.open('Task created successfuly')

    setTimeout(() => snackbar.dismiss(), 2000)
  }

}
