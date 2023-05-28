import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    functionalities: Functionality[],
    tasks: Task[],
    users: User[], 
  } = {functionalities: [], tasks: [], users: []};
  protected isDisabled!: boolean;
  
  private routeSub$?: Subscription;

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
      this.isDisabled = data === this.selectedId
    })

  }

  
  ngOnDestroy(): void {
    this.routeSub$?.unsubscribe();
  }
  
  private getDetails() {
    const allFuncs = this.functionalityService.getAllFunctionalities();
    const allTasks = this.taskService.getAllTasks();
    const allUsers = this.userService.getAllUsers();

    allFuncs.subscribe((data) => {
      this.details.functionalities = data.filter(item => item.functionality_projectId === this.selectedId);
    })
    
    allTasks.subscribe((data) => {
      this.details.tasks = data.filter(item => {
        return this.details.functionalities.some(func => func.functionality_ID === item.task_functionalityId)
      })
    })
    
    allUsers.subscribe((data) => {
      this.details.users = data.filter((item) => {
        const funcUsers = this.details.functionalities.some(func => func.functionality_ownerId === item.user_id);
        const taskUsers = this.details.tasks.some(func => func.task_assignedEmployeeId === item.user_id);
        return funcUsers || taskUsers;
      })
    })
  }

  protected completionTime() {
    return this.details.tasks.reduce((acc, val) => acc + val.task_durationInHours, 0)
  }

  protected workedHours() {
    return this.details.tasks.reduce((acc, val) => {
      if(val.task_state === 'DONE') { return acc + val.task_durationInHours}
      
      return acc;
    }, 0)
  }

  protected startedAt(): string {
    const created = this.details.tasks
      .filter(item => !!item.task_startedAt)
      .map(item => item.task_startedAt!.getTime());
    
    if(created.length === 0) {
      return 'NOT STARTED'
    }
    const min = Math.min(...created);
    return new Date(min).toLocaleString();
  }

  protected setAsWorkingProject() {
    this.globalState.setWorkingProject(this.selectedId);
    this.isDisabled = true;
  }
}
