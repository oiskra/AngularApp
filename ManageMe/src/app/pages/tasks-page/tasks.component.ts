import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  private tasks: Task[] = [];
  protected tasksToDo: Task[] = [];
  protected tasksDoing: Task[] = [];
  protected tasksDone: Task[] = [];

  private taskSub$!: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskSub$ = this.taskService.getAllTasks().subscribe(data => {
      this.tasks = [...data];
      this.tasks.forEach(task => {
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
    })

  }

  ngOnDestroy(): void {
    this.taskSub$.unsubscribe();
  }

  onAddTaskClick() {

  }

  onTaskClick(id: number) {
    
  }

  onEditTaskClick(id: number) {

  }

  onDeleteTaskClick(id: number) {

  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
