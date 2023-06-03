import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/models/project.model';
import { Role, User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  protected projects!: Project[];
  protected currentUser?: User;
  protected displayedColumns!: string[];

  constructor(private router: Router, 
    protected projectService: ProjectService,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = [...data];      
    })
    
    this.auth.loggedUser$.subscribe(user => {
      this.currentUser = {...user!};
    })
    
    this.displayedColumns = this.currentUser?.user_role === Role.ADMIN || this.currentUser?.user_role === Role.DEVOPS ? 
      ['Name', 'Description', 'Edit', 'Delete'] :
      ['Name', 'Description'];
  }

  onAddProjectClick() {
    this.router.navigateByUrl('/projects/create')
  }

  onEditProjectClick(projectId: number) {
    this.router.navigateByUrl(`/projects/edit/${projectId}`)
  }

  onDeleteProjectClick(projectId: number) {
    this.projectService.deleteProject(projectId);
  }

  onProjectClick(projectId: number) {
    this.router.navigateByUrl(`/projects/details/${projectId}`);
  }
}
