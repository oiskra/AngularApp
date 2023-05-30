import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

import { ProjectsComponent } from './pages/projects-page/projects.component';
import { FunctionalitiesComponent } from './pages/functionalities-page/functionalities.component';
import { TasksComponent } from './pages/tasks-page/tasks.component';
import { UsersComponent } from './pages/users-page/users.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProjectDetailsComponent } from './pages/projects-page/project-details/project-details.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';
import { ProjectCreateComponent } from './pages/projects-page/project-create/project-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectEditComponent } from './pages/projects-page/project-edit/project-edit.component';
import { FunctionalitiesCreateComponent } from './pages/functionalities-page/functionalities-create/functionalities-create.component';
import { FunctionalitiesDetailsComponent } from './pages/functionalities-page/functionalities-details/functionalities-details.component';
import { FunctionalitiesEditComponent } from './pages/functionalities-page/functionalities-edit/functionalities-edit.component';
import { TaskCreateComponent } from './pages/tasks-page/task-create/task-create.component';
import { TaskListItemComponent } from './common/task-list-item/task-list-item.component';
import { TaskDetailsComponent } from './pages/tasks-page/task-details/task-details.component';
import { TaskEditComponent } from './pages/tasks-page/task-edit/task-edit.component';
import { UserDetailsComponent } from './pages/users-page/user-details/user-details.component';
import { UserEditComponent } from './pages/users-page/user-edit/user-edit.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    FunctionalitiesComponent,
    TasksComponent,
    UsersComponent,
    LayoutComponent,
    ProjectDetailsComponent,
    PageHeaderComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    FunctionalitiesCreateComponent,
    FunctionalitiesDetailsComponent,
    FunctionalitiesEditComponent,
    TaskCreateComponent,
    TaskListItemComponent,
    TaskDetailsComponent,
    TaskEditComponent,
    UserDetailsComponent,
    UserEditComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DragDropModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
