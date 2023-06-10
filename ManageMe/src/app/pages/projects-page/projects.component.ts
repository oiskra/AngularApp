import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';
import { Role } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  protected projects$!: Observable<Project[]>;
  protected displayedColumns!: string[];
  protected displayCreateButton!: boolean;

  constructor(private router: Router, 
    protected projectService: ProjectService,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getAllProjects();
    
    this.auth.loggedUser$.subscribe(user => {
      const isAdminOrDevops: boolean = user?.user_role === Role.ADMIN || user?.user_role === Role.DEVOPS;
      this.displayCreateButton = isAdminOrDevops;
      this.displayedColumns = isAdminOrDevops ? 
        ['Name', 'Description', 'Edit', 'Delete'] :
        ['Name', 'Description'];
    })
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
