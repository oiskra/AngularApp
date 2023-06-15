import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { FunctionalityService } from 'src/services/functionality.service';
import { GlobalStateService } from 'src/services/global-state.service';

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
  private currentUserSub$!: Subscription;
  private currentUser?: User;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private functionalityService: FunctionalityService, 
    private globalState: GlobalStateService,
    private snackBar: MatSnackBar,
    private auth: AuthService) {}
  
  ngOnInit() { 
    this.subStatus$ = this.functionalityForm.statusChanges.subscribe();
    this.subWorkingProject$ = this.globalState.workingProject$.subscribe(data => {
      this.workingProjectId = data;
    });

    this.currentUserSub$ = this.auth.loggedUser$.subscribe(data => {
      this.currentUser = {...data!};
    })
  }
  
  ngOnDestroy(): void {
    this.subStatus$.unsubscribe();
    this.subWorkingProject$.unsubscribe();
    this.currentUserSub$.unsubscribe();
  }

  onSubmit() {
    if(this.workingProjectId === GlobalStateService.NOT_SELECTED_PROJECT) {
      this.snackBar.open('You have to select a working project first', undefined, {duration:2000})
      return;
    }

    const {value} = this.functionalityForm;

    const newFunctionality: Functionality = {
      functionality_ID: Date.now(),
      functionality_name: value.name!,
      functionality_description: value.description!,
      functionality_priority: Number(value.priority!),
      functionality_projectId: this.workingProjectId,
      functionality_ownerId: this.currentUser?.user_id!,
      functionality_state: 'TODO'
    }

    this.functionalityService.createFunctionality(newFunctionality); 
    this.snackBar.open('Functionality created successfuly', undefined, {duration:2000})

    this.router.navigateByUrl('/functionalities')   
  }

}
