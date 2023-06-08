import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, of, switchMap } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { FunctionalityService } from 'src/services/functionality.service';
import { ProjectService } from 'src/services/project.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-functionalities-details',
  templateUrl: './functionalities-details.component.html',
  styleUrls: ['./functionalities-details.component.scss']
})
export class FunctionalitiesDetailsComponent implements OnInit, OnDestroy {

  private routeSub$!: Subscription;
  protected selectedId!: number;
  protected selectedFunctionality?: Functionality;
  protected details: {
    owner: string,
    project: string,
    tasks: Observable<Task[]>,
    users: Observable<User[]>, 
  } = {owner: '', project: '', tasks: of([]), users: of([])};

  constructor(private route: ActivatedRoute, 
    private functionalityService: FunctionalityService,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService) {}
  
  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params) => {
      this.selectedId = Number(params['id']);
      this.selectedFunctionality = this.functionalityService.getFunctionality(this.selectedId);
    }); 

    this.details.tasks = this.taskService.getRelatedFunctionalityTasks(this.selectedId);

    this.details.users = this.userService.getAllUsers()
    .pipe(
      switchMap(users => this.details.tasks.pipe(map(tasks => [users, tasks]))),
      map(([users, tasks]) => {
        return (users as User[]).filter((user: User) => {
          
          return user.user_id === this.selectedFunctionality?.functionality_ownerId || (tasks as Task[]).some(task => {
            return (task as Task).task_assignedEmployeeId === user.user_id
          });
        })
      })
    )

    const owner: User | undefined = this.userService.getUser(this.selectedFunctionality?.functionality_ownerId!);
    this.details.owner = owner?.user_name + ' ' + owner?.user_surname;
    this.details.project = this.projectService.getProject(this.selectedFunctionality?.functionality_projectId!)?.project_name!;
  }
  
  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  startedAt() {
    return this.details.tasks.pipe(
      map(tasks => {
        const startedAtValues = tasks
          .filter((task) => !!task.task_startedAt)
          .map(task => task.task_startedAt!.getTime());

        if(startedAtValues.length === 0) {
          return 'NOT STARTED'
        }
        
        
        const min = Math.min(...startedAtValues);
        return new Date(min).toLocaleString();
      }), 

    )
  }

  completionTime() {
    return this.details.tasks
      .pipe(
        map(tasks => tasks.reduce((acc, val) => acc + val.task_durationInHours, 0))
      ) 
  }

  workedHours() {
    return this.details.tasks
      .pipe(
        map(tasks => tasks.reduce((acc, val) => {
          if(val.task_state === 'DONE') { return acc + val.task_durationInHours}
          
          return acc;
        }, 0))
      )  
  }

  
}
