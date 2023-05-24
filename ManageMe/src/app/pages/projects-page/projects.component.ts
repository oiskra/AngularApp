import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  protected displayedColumns: string[] = ['Name', 'Description', 'Edit', 'Delete'];
  protected projects!: Project[]

  constructor(private router: Router, 
    protected projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = [...data];      
    })
  }

  onAddProjectClick() {
    this.router.navigateByUrl('/projects/create')
  }

  onEditProjectClick(projectId: number) {
    this.router.navigateByUrl(`/projects/edit/${projectId}`)
  }

  onProjectClick(projectId: number) {
    this.router.navigateByUrl(`/projects/details/${projectId}`);
  }
}
