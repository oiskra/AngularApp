import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/models/project.model';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  protected projectForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  
  protected subStatus$!: Subscription;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) {}

  ngOnInit() { 
    this.subStatus$ = this.projectForm.statusChanges.subscribe();
  }

  ngOnDestroy() {
    this.subStatus$.unsubscribe();
  }

  onSubmit() {
    const {value} = this.projectForm;

    const newProject: Project = {
        project_ID: Date.now(),
        project_name: value.name!,
        project_description: value.description!
    }

    this.projectService.createProject(newProject);    
  }
}
