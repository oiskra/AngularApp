import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project } from 'src/models/project.model';
import { FunctionalityService } from './functionality.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _projects: BehaviorSubject<Project[]> = new BehaviorSubject([
    {project_ID: 1, project_name: 'Angular Project', project_description: 'Cool app!'},
  ]);
  
  private projects$: Observable<Project[]> = this._projects.asObservable();

  constructor(private functionalityService: FunctionalityService) { }
  
  getAllProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProject(id: number): Project | undefined {
    return this._projects.getValue().find(project => project.project_ID === id);
  }

  createProject(project: Project): void {
    this._projects.getValue().push(project);
  }

  updateProject(id: number, project: Project): void {
    if(id !== project.project_ID) {
      return;
    }

    const index: number = this._projects.getValue().findIndex((item) => item.project_ID === id);
    this._projects.getValue()[index] = project;
  }

  deleteProject(id: number): void {
    const index: number = this._projects.getValue().findIndex((item) => item.project_ID === id);
    if(index < 0) {
      return;
    }
    this._projects.getValue().splice(index, 1);
    this._projects.next(this._projects.getValue());

    this.functionalityService.getAllFunctionalities()
      .pipe(
        map(data => data.filter(functionality => functionality.functionality_projectId === id)),
        map(data => data.map(functionality => functionality.functionality_ID))
      )
      .subscribe(data => {
        for (const funcId of data) {
          this.functionalityService.deleteFunctionality(funcId);
        }
      }).unsubscribe();
  }
}
