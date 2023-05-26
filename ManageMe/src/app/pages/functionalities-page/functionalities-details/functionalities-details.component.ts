import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { Project } from 'src/models/project.model';
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
  private relatedTasksSub$!: Subscription;
  private relatedUsersSub$!: Subscription;
  protected selectedId!: number;
  protected selectedFunctionality?: Functionality;
  protected details: {
    owner: string,
    project: string,
    tasks: Task[],
    users: User[], 
  } = {owner: '', project: '', tasks: [], users: []};
  protected owner?: User 

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

    this.relatedTasksSub$ = this.taskService.getRelatedFunctionalityTasks(this.selectedId).subscribe(data => {
      this.details.tasks = [...data];
    });

    this.relatedUsersSub$ = this.userService.getAllUsers().subscribe((data) => {
      const filteredUsers = data.filter((item) => {
        return this.details.tasks.some(func => func.task_assignedEmployeeId === item.user_id) || item.user_id === this.selectedFunctionality?.functionality_ownerId;
      });

      this.details.users = [...filteredUsers];
    })

    const owner: User | undefined = this.userService.getUser(this.selectedFunctionality?.functionality_ownerId!);
    this.details.owner = owner?.user_name + ' ' + owner?.user_surname;
    this.details.project = this.projectService.getProject(this.selectedFunctionality?.functionality_projectId!)?.project_name!;
  }
  
  ngOnDestroy(): void {
    this.routeSub$.unsubscribe()
    this.relatedTasksSub$.unsubscribe()
    this.relatedUsersSub$.unsubscribe()
  }

  startedAt() {
    const created = this.details.tasks
      .filter(item => !!item.task_startedAt) 
      .map(item => item.task_startedAt!.getTime());
    
    if(created.length === 0) {
      return 'NOT STARTED'
    }

    const min = Math.min(...created);
    return new Date(min).toLocaleString();
  }

  completionTime() {
    return this.details.tasks.reduce((acc, val) => acc + val.task_durationInHours, 0)
  }

  workedHours() {
    return this.details.tasks.reduce((acc, val) => {
      if(val.task_state === 'DONE') { return acc + val.task_durationInHours}
      
      return acc;
    }, 0)
  }

  
}
