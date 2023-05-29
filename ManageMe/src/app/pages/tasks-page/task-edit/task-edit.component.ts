import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { FunctionalityService } from 'src/services/functionality.service';
import { GlobalStateService } from 'src/services/global-state.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, OnDestroy{
  private selectedId!: number;
  private selectedTask?: Task;
  protected functionalitiesOptions: Functionality[] = [];
  protected userOptions: User[] = [];
  private workingProjectId!: number; 
  private funcSub$!: Subscription;
  private userSub$!: Subscription;

  protected editForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: [1, Validators.required],
    relatedFunctionality: [1, Validators.required],
    duration: [1, Validators.required],
    assignedUser: [1, Validators.required]
  });
  
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private taskService: TaskService,
    private functionalityService: FunctionalityService,
    private userService: UserService,
    private globalState: GlobalStateService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.selectedId = Number(param['id']);
      this.selectedTask = this.taskService.getTask(this.selectedId);
    })
    
    this.globalState.workingProject$.subscribe(projId => {this.workingProjectId = projId})
    
    this.funcSub$ = this.functionalityService.getAllFunctionalities()
    .subscribe(data => {
      this.functionalitiesOptions = data.filter(func => {        
        return func.functionality_projectId === this.workingProjectId;
      })
    });

    this.userSub$ = this.userService.getAllUsers().subscribe(data => {this.userOptions = [...data]})

    this.editForm.setValue({
      name: this.selectedTask?.task_name!, 
      description: this.selectedTask?.task_description!,
      priority: this.selectedTask?.task_priority!,
      relatedFunctionality: this.selectedTask?.task_functionalityId!,
      duration: this.selectedTask?.task_durationInHours!,
      assignedUser: this.selectedTask?.task_assignedEmployeeId!
    });
  }

  ngOnDestroy(): void {
    this.funcSub$.unsubscribe();
  }
  

  onSubmit() {
    const {value} = this.editForm;

    this.taskService.updateTask(this.selectedId, {
      task_ID:this.selectedTask?.task_ID!,
      task_name: value.name!,
      task_description: value.description!,
      task_priority: Number(value.priority!),
      task_functionalityId: Number(value.relatedFunctionality!),
      task_durationInHours: Number(value.duration!),
      task_state: this.selectedTask?.task_state!,
      task_addedAt: this.selectedTask?.task_addedAt!,
      task_startedAt: this.selectedTask?.task_startedAt!,
      task_finishedAt: this.selectedTask?.task_finishedAt!,
      task_assignedEmployeeId: value.assignedUser!
    })

    const snackbar = this.snackBar.open('Task edited successfuly')

    setTimeout(() => snackbar.dismiss(), 2000)
  }
}
