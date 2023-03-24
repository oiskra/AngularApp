import { Component } from '@angular/core';
import { CSS } from '../models/css.model';

@Component({
  selector: 'app-css-input',
  templateUrl: './css-input.component.html',
  styleUrls: ['./css-input.component.scss']
})
export class CssInputComponent {
  
  protected css : CSS = {
    color: undefined,
    border: undefined,
    'box-shadow': undefined,
    background: undefined
  }

  protected background = 'lightgreen'

  protected onGenerateCss() {
    const {color, background} = this.css;
    console.log(color);
    console.log(background);
  }
}
