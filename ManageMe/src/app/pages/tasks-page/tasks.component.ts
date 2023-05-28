import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { State } from 'src/models/state.model';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  protected tasks: Task[] = []
  protected tasksToDo: Task[] = [];
  protected tasksDoing: Task[] = [];
  protected tasksDone: Task[] = [];

  private taskSub$!: Subscription;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskSub$ = this.taskService.getAllTasks().subscribe(data => {
      this.tasks = [...data]
      
      if(data.length === [...this.tasksToDo, ...this.tasksDone, ...this.tasksDoing].length) {return;}
      
      this.tasksToDo = [];
      this.tasksDoing = [];
      this.tasksDone = [];

      data.forEach(task => {
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
      })
    });
  }

  ngOnDestroy(): void {
    this.taskSub$.unsubscribe();
  }

  onAddTaskClick() {
    this.router.navigateByUrl('tasks/create');
  }

  changeState(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const updatedNonObservedTaskId: number = event.container.data[event.currentIndex].task_ID;
      const updatedTask: Task = this.tasks.find(task => task.task_ID === updatedNonObservedTaskId)! 
      const updatedState: State = event.container.id as State;

      const updatedTaskClone: Task = {...updatedTask};
      updatedTaskClone.task_state = updatedState;

      switch(updatedState) {
        case 'TODO':
          updatedTaskClone.task_startedAt = undefined;
          updatedTaskClone.task_finishedAt = undefined;
          break;
        case 'DOING':
          if(updatedTaskClone.task_startedAt) {
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
    }
  }
}
