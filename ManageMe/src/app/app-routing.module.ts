import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './pages/users-page/users.component';
import { ProjectsComponent } from './pages/projects-page/projects.component';
import { FunctionalitiesComponent } from './pages/functionalities-page/functionalities.component';
import { TasksComponent } from './pages/tasks-page/tasks.component';
import { ProjectDetailsComponent } from './pages/projects-page/project-details/project-details.component';
import { ProjectCreateComponent } from './pages/projects-page/project-create/project-create.component';
import { ProjectEditComponent } from './pages/projects-page/project-edit/project-edit.component';
import { FunctionalitiesCreateComponent } from './pages/functionalities-page/functionalities-create/functionalities-create.component';
import { FunctionalitiesDetailsComponent } from './pages/functionalities-page/functionalities-details/functionalities-details.component';
import { FunctionalitiesEditComponent } from './pages/functionalities-page/functionalities-edit/functionalities-edit.component';
import { TaskCreateComponent } from './pages/tasks-page/task-create/task-create.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/details/:id', component: ProjectDetailsComponent},
  {path: 'projects/create', component: ProjectCreateComponent},
  {path: 'projects/edit/:id', component: ProjectEditComponent},
  {path: 'functionalities', component: FunctionalitiesComponent},
  {path: 'functionalities/create', component: FunctionalitiesCreateComponent},
  {path: 'functionalities/details/:id', component: FunctionalitiesDetailsComponent},
  {path: 'functionalities/edit/:id', component: FunctionalitiesEditComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks/create', component: TaskCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
