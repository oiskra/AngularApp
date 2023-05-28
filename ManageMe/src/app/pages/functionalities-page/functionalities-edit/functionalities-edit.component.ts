import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Functionality } from 'src/models/functionality.model';
import { FunctionalityService } from 'src/services/functionality.service';

@Component({
  selector: 'app-functionalities-edit',
  templateUrl: './functionalities-edit.component.html',
  styleUrls: ['./functionalities-edit.component.scss']
})
export class FunctionalitiesEditComponent {
  private selectedId!: number;
  public selectedFunctionality?: Functionality;
  protected editForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: [1, Validators.required]
  });
  
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private functionalityService: FunctionalityService) {}
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.selectedId = Number(param['id']);
      this.selectedFunctionality = this.functionalityService.getFunctionality(this.selectedId);
    })

    this.editForm.setValue({
      name: this.selectedFunctionality?.functionality_name!, 
      description: this.selectedFunctionality?.functionality_description!,
      priority: this.selectedFunctionality?.functionality_priority!
    });
  }

  onSubmit() {
    const {value} = this.editForm;

    this.functionalityService.updateFunctionality(this.selectedId, {
      functionality_ID: this.selectedId,
      functionality_name: value.name!,
      functionality_description: value.description!,
      functionality_priority: value.priority!,
      functionality_ownerId: this.selectedFunctionality?.functionality_ownerId!,
      functionality_projectId: this.selectedFunctionality?.functionality_projectId!,
      functionality_state: this.selectedFunctionality?.functionality_state!,
    })
  }
}
