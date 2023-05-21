import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() buttonTitle!: string;
  @Output() headerButtonClick: EventEmitter<void> = new EventEmitter();

  onHeaderButtonClick() {
    this.headerButtonClick.emit();
  }
}
