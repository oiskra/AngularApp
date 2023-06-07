import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, of, switchMap } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { Project } from 'src/models/project.model';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { FunctionalityService } from 'src/services/functionality.service';
import { GlobalStateService } from 'src/services/global-state.service';
import { ProjectService } from 'src/services/project.service';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  protected selectedId!: number
  protected selectedProject?: Project;
  protected details: {
    functionalities: Observable<Functionality[]>,
    tasks: Observable<Task[]>,
    users: Observable<User[]>,
  } = {functionalities: of([]), tasks: of([]), users: of([])};
  protected isSetWorkingProjectDisabled!: boolean;
  
  private routeSub$!: Subscription;

  constructor(
    private route: ActivatedRoute, 
    protected projectService: ProjectService, 
    private functionalityService: FunctionalityService,
    private taskService: TaskService,
    private userService: UserService,
    private globalState: GlobalStateService) { }
  
  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe((params) => {
      this.selectedId = Number(params['id']);
      this.selectedProject = this.projectService.getProject(this.selectedId);
    }); 
    
    this.getDetails();  
    this.globalState.workingProject$.subscribe(data => {
      this.isSetWorkingProjectDisabled = data === this.selectedId
    })
  }
  
  ngOnDestroy(): void {
    this.routeSub$?.unsubscribe();
  }
  
  private getDetails() {
    this.details.functionalities = this.functionalityService.getAllFunctionalities()
      .pipe(
        map(
          functionalities => functionalities.filter(func => func.functionality_projectId === this.selectedId)
        )
      );

    this.details.tasks = this.taskService.getAllTasks()
      .pipe(
        switchMap(tasks => this.details.functionalities.pipe(map(functionalities => [tasks, functionalities] as [Task[], Functionality[]]))),
        map(
          ([tasks, functionalities]) => tasks.filter(task => {
            return functionalities.some(func => func.functionality_ID === task.task_functionalityId)
          })
        )
      );
    
    this.details.users = this.userService.getAllUsers()
      .pipe(
        switchMap(users => this.details.functionalities.pipe(map(functionalities => [users, functionalities] as [User[], Functionality[]]))),
        switchMap(([users, functionalities]) => this.details.tasks.pipe(map(tasks => [users, functionalities, tasks] as [User[], Functionality[], Task[]]))),
        map(
          ([users, functionalities, tasks]) => {
            return users.filter(user => 
              functionalities.some(func => func.functionality_ownerId === user.user_id) ||
              tasks.some(func => func.task_assignedEmployeeId === user.user_id)
            )
          }
        )
      );
  }

  protected completionTime() {
    return this.details.tasks.pipe(
      map(tasks => tasks.reduce((acc, val) => acc + val.task_durationInHours, 0))
    );
  }

  protected workedHours() {
    return this.details.tasks.pipe(
      map(tasks => tasks.reduce((acc, val) => {
        if(val.task_state === 'DONE') { return acc + val.task_durationInHours}
        
        return acc;
      }, 0))
    )
  }

  protected startedAt() {
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
      })
    )
  }

  protected setAsWorkingProject() {
    this.globalState.setWorkingProject(this.selectedId);
    this.isSetWorkingProjectDisabled = true;
  }
}
