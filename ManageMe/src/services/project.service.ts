import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, from, Subscription, tap, Subject } from 'rxjs';
import { Project } from 'src/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _projects: BehaviorSubject<Project[]> = new BehaviorSubject([
    {project_ID: 0, project_name: 'Angular Project', project_description: 'Cool app!'},
    {project_ID: 1, project_name: 'React Project', project_description: 'Cooler app!'},
    {project_ID: 2, project_name: 'Angular Project', project_description: 'Cool app!'},
    {project_ID: 3, project_name: 'React Project', project_description: 'Cooler app!'},
    {project_ID: 4, project_name: 'Angular Project', project_description: 'Cool app!'},
    {project_ID: 5, project_name: 'React Project', project_description: 'Cooler app!'},
    {project_ID: 6, project_name: 'Angular Project', project_description: 'Cool app!'},
    {project_ID: 7, project_name: 'React Project', project_description: 'Cooler app!'},
    {project_ID: 8, project_name: 'Angular Project', project_description: 'Cool app!'},
    {project_ID: 9, project_name: 'React Project', project_description: 'Cooler app!'}
  ]);
  public projects$: Observable<Project[]> = this._projects.asObservable();
  
  private _workingProject: BehaviorSubject<number> = new BehaviorSubject(this._projects.getValue()[0].project_ID);
  private workingProject$: Observable<number> = this._workingProject.asObservable();


  constructor() { }

  setWorkingProject(id: number) {
    this._workingProject.next(id);
  }

  getWorkingProject(): Observable<number> {
    return this.workingProject$;
  }
  
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

    const index: number = this._projects.getValue().findIndex((item) => item.project_ID == id);
    this._projects.getValue()[index] = project;
  }

  deleteProject(id: number): void {
    const index: number = this._projects.getValue().findIndex((item) => item.project_ID == id);
    if(index < 0) {
      return;
    }
    this._projects.getValue().splice(index, 1);
    this._projects.next(this._projects.getValue())
  }

}
