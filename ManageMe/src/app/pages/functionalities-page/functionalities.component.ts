import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functionality } from 'src/models/functionality.model';
import { FunctionalityService } from 'src/services/functionality.service';

@Component({
  selector: 'app-functionalities',
  templateUrl: './functionalities.component.html',
  styleUrls: ['./functionalities.component.scss']
})
export class FunctionalitiesComponent implements OnInit {
  protected functionalities!: Functionality[]
  protected displayedColumns: string[] = [
    'Name',
    'Description', 
    'Owner',
    'Priority',
    'State',
    'Edit', 
    'Delete'
  ]

  constructor(private router: Router,protected functionalityService: FunctionalityService) {}

  ngOnInit(): void {
    this.functionalityService.getAllFunctionalities().subscribe(data => {
      this.functionalities = [...data]
    })
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
