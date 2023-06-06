import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Functionality } from 'src/models/functionality.model';
import { Role, User } from 'src/models/user.model';
import { AuthService } from 'src/services/auth.service';
import { FunctionalityService } from 'src/services/functionality.service';

@Component({
  selector: 'app-functionalities',
  templateUrl: './functionalities.component.html',
  styleUrls: ['./functionalities.component.scss']
})
export class FunctionalitiesComponent implements OnInit, OnDestroy {
  protected functionalities = new MatTableDataSource<Functionality>();
  protected functionalitiesSub$!: Subscription;
  protected currentUser?: User;
  protected displayedColumns!: string[];

  protected filterStateSelect: FormControl<string | null> = new FormControl();
  protected filterStateSelectSub$!: Subscription;

  constructor(private router: Router,
    protected functionalityService: FunctionalityService,
    private auth: AuthService) {}


  ngOnInit(): void {
    
    this.functionalitiesSub$ = this.functionalityService.getAllWorkingFunctionalities().subscribe(data => {
      this.functionalities.data = [...data]
    })

    this.filterStateSelectSub$ = this.filterStateSelect.valueChanges.subscribe(filterVal => {
      this.functionalities.filter = filterVal as string;   
    })

    this.auth.loggedUser$.subscribe(user => {
      this.currentUser = {...user!};
    })
    
    this.displayedColumns = this.currentUser?.user_role === Role.ADMIN || this.currentUser?.user_role === Role.DEVOPS ? 
      ['Name', 'State', 'Edit', 'Delete'] :
      ['Name', 'State'];
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
