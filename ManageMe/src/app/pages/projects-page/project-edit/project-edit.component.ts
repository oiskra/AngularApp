import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  private selectedId!: number;
  public selectedProject?: Project;
  protected editForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private projectService: ProjectService,
    private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.selectedId = Number(param['id']);
      this.selectedProject = this.projectService.getProject(this.selectedId);
    })

    this.editForm.setValue({
      name: this.selectedProject?.project_name!, 
      description: this.selectedProject?.project_description!
    });
  }

  onSubmit() {
    const {value} = this.editForm;

    this.projectService.updateProject(this.selectedId, {
      project_ID: this.selectedId,
      project_name: value.name!,
      project_description: value.description!
    })

    this.snackBar.open('Project edited successfully', undefined, {duration: 2000})
  }
}
