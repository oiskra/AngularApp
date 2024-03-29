import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CssInputComponent } from './css-input/css-input.component';
import { CssResultComponent } from './css-result/css-result.component';

@NgModule({
  declarations: [
    AppComponent,
    CssInputComponent,
    CssResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
