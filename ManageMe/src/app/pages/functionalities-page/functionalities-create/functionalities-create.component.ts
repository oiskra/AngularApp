import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { FunctionalityService } from 'src/services/functionality.service';
import { GlobalStateService } from 'src/services/global-state.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-functionalities-create',
  templateUrl: './functionalities-create.component.html',
  styleUrls: ['./functionalities-create.component.scss']
})
export class FunctionalitiesCreateComponent implements OnInit, OnDestroy {
  protected functionalityForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: [1, Validators.required],
  });

  protected subStatus$!: Subscription;
  private subWorkingProject$!: Subscription;
  private workingProjectId!: number;

  constructor(private router: Router, private formBuilder: FormBuilder, private functionalityService: FunctionalityService, private globalState: GlobalStateService) {}
  
  ngOnInit() { 
    this.subStatus$ = this.functionalityForm.statusChanges.subscribe();
    this.subWorkingProject$ = this.globalState.workingProject$.subscribe(data => {
      this.workingProjectId = data;
    });
  }
  
  ngOnDestroy(): void {
    this.subStatus$.unsubscribe();
  }

  onSubmit() {
    const {value} = this.functionalityForm;

    const newFunctionality: Functionality = {
      functionality_ID: Date.now(),
      functionality_name: value.name!,
      functionality_description: value.description!,
      functionality_priority: Number(value.priority!),
      functionality_projectId: this.workingProjectId,
      functionality_ownerId: 1,
      functionality_state: 'TODO'
    }

    this.functionalityService.createFunctionality(newFunctionality); 
    this.router.navigateByUrl('/functionalities')   
  }

}
