import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medium-card',
  templateUrl: './medium-card.component.html',
  styleUrls: ['./medium-card.component.scss']
})
export class MediumCardComponent {
  @Input() title = ""
  @Input() value = ""
  @Input() percentValue = ""
  @Input() imageSrc = ""
}
