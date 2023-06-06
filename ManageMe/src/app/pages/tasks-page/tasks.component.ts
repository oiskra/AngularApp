import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { State } from 'src/models/state.model';
import { Task } from 'src/models/task.model';
import { AuthService } from 'src/services/auth.service';
import { FunctionalityService } from 'src/services/functionality.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  protected tasks: Task[] = [];
  protected tasksToDo: Task[] = [];
  protected tasksDoing: Task[] = [];
  protected tasksDone: Task[] = [];
  private loggedUserId!: number;

  private taskSub$!: Subscription;
  private loggedUserIdSub$!: Subscription;

  constructor(
    private auth: AuthService,
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private functionalityService: FunctionalityService
  ) {}

  ngOnInit(): void {
    this.taskSub$ = this.taskService.getAllWorkingTasks().subscribe((data) => {
      this.tasks = [...data];

      if (
        data.length ===
        [...this.tasksToDo, ...this.tasksDone, ...this.tasksDoing].length
      ) {
        return;
      }

      this.tasksToDo = [];
      this.tasksDoing = [];
      this.tasksDone = [];

      data.forEach((task) => {
        switch (task.task_state) {
          case 'TODO':
            this.tasksToDo.push(task);
            break;
          case 'DOING':
            this.tasksDoing.push(task);
            break;
          case 'DONE':
            this.tasksDone.push(task);
            break;
        }
      });
    });

    this.loggedUserIdSub$ = this.auth.loggedUser$
      .pipe(map((user) => user!.user_id))
      .subscribe((id) => {
        this.loggedUserId = id;
      });
  }

  ngOnDestroy(): void {
    this.taskSub$.unsubscribe();
    this.loggedUserIdSub$.unsubscribe();
  }

  onAddTaskClick() {
    this.router.navigateByUrl('tasks/create');
  }

  changeState(event: CdkDragDrop<Task[]>) {
    if (
      event.previousContainer.data[event.previousIndex]
        .task_assignedEmployeeId !== this.loggedUserId
    ) {
      this.snackBar.open(
        "You can't update tasks that are not assigned to you",
        undefined,
        {
          duration: 2000,
        }
      );
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateState(event);
    }
  }

  private updateState(event: CdkDragDrop<Task[]>) {
    const updatedNonObservedTaskId: number =
      event.container.data[event.currentIndex].task_ID;
    const updatedTask: Task = this.tasks.find(
      (task) => task.task_ID === updatedNonObservedTaskId
    )!;
    const updatedState: State = event.container.id as State;

    const updatedTaskClone: Task = { ...updatedTask };
    updatedTaskClone.task_state = updatedState;

    switch (updatedState) {
      case 'TODO':
        updatedTaskClone.task_startedAt = undefined;
        updatedTaskClone.task_finishedAt = undefined;
        break;
      case 'DOING':
        if (updatedTaskClone.task_startedAt) {
          updatedTaskClone.task_finishedAt = undefined;
          break;
        }
        updatedTaskClone.task_startedAt = new Date(Date.now());
        break;
      case 'DONE':
        updatedTaskClone.task_finishedAt = new Date(Date.now());
        break;
    }

    this.taskService.updateTask(updatedTask.task_ID, updatedTaskClone);

    const relatedFunctionality: Functionality =
      this.functionalityService.getFunctionality(
        updatedTask.task_functionalityId
      )!;

    this.taskService
      .getRelatedFunctionalityTasks(relatedFunctionality.functionality_ID)
      .subscribe((data) => {
        const clone = { ...relatedFunctionality };

        if (data.every((task) => task.task_state === 'TODO')) {
          clone.functionality_state = 'TODO';
        } else if (data.every((task) => task.task_state === 'DONE')) {
          clone.functionality_state = 'DONE';
        } else if (data.some((task) => task.task_state === 'DOING')) {
          clone.functionality_state = 'DOING';
        }

        this.functionalityService.updateFunctionality(
          relatedFunctionality.functionality_ID,
          clone
        );
      })
      .unsubscribe();
  }
}
