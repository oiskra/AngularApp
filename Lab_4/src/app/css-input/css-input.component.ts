import { Component } from '@angular/core';

@Component({
  selector: 'app-css-input',
  templateUrl: './css-input.component.html',
  styleUrls: ['./css-input.component.scss']
})
export class CssInputComponent {
  protected color? = ''
  
  protected onGenerateCss() {
    throw new Error('Method not implemented.');
  }
}
