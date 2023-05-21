import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ProjectsComponent } from './pages/projectsPage/projects.component';
import { FunctionalitiesComponent } from './pages/functionalitiesPage/functionalities.component';
import { TasksComponent } from './pages/tasksPage/tasks.component';
import { UsersComponent } from './pages/usersPage/users.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    FunctionalitiesComponent,
    TasksComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
