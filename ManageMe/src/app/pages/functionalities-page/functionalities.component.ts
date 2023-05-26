import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { FunctionalityService } from 'src/services/functionality.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-functionalities',
  templateUrl: './functionalities.component.html',
  styleUrls: ['./functionalities.component.scss']
})
export class FunctionalitiesComponent implements OnInit, OnDestroy {
  protected functionalities = new MatTableDataSource<Functionality>();
  protected functionalitiesSub$!: Subscription;
  protected displayedColumns: string[] = [
    'Name',
    'State',
    'Edit', 
    'Delete'
  ];

  protected filterStateSelect: FormControl<string | null> = new FormControl();
  protected filterStateSelectSub$!: Subscription;

  constructor(private router: Router,
    protected functionalityService: FunctionalityService,
    private taskService: TaskService) {}


  ngOnInit(): void {
    
    this.functionalitiesSub$ = this.functionalityService.getAllFunctionalities().subscribe(data => {
      this.functionalities.data = [...data]
    })

    this.filterStateSelectSub$ = this.filterStateSelect.valueChanges.subscribe(filterVal => {
      this.functionalities.filter = filterVal as string;   
    })
  }

  ngOnDestroy(): void {
    this.filterStateSelectSub$.unsubscribe();
    this.functionalitiesSub$.unsubscribe();
  }

  onAddFunctionalityClick() {
    this.router.navigateByUrl('/functionalities/create');
  }

  onFunctionalityClick(id: number) {
    this.router.navigateByUrl(`/functionalities/details/${id}`);
  }

  onEditFunctionalityClick(id: number) {
    this.router.navigateByUrl(`/functionalities/edit/${id}`)
  }

  onDeleteFunctionalityClick(id: number) {
    this.functionalityService.deleteFunctionality(id);
  }
}
