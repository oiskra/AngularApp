import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, iif, map, mergeMap, of, tap } from 'rxjs';
import { GlobalStateService } from 'src/services/global-state.service';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() displayButton!: boolean;
  @Input() buttonTitle!: string;
  @Output() headerButtonClick: EventEmitter<void> = new EventEmitter();

  protected projectName$!: Observable<string>;

  constructor(
    private globalState: GlobalStateService,
    private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectName$ = this.globalState.workingProject$.pipe(
      mergeMap(id => of(this.projectService.getProject(id))),
      map(project => !project ? 'NOT SELECTED' : project.project_name),
    )
  }

  onHeaderButtonClick() {
    this.headerButtonClick.emit();
  }
}
