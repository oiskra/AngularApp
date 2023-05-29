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
import { TaskDetailsComponent } from './pages/tasks-page/task-details/task-details.component';
import { TaskEditComponent } from './pages/tasks-page/task-edit/task-edit.component';
import { UserEditComponent } from './pages/users-page/user-edit/user-edit.component';
import { UserDetailsComponent } from './pages/users-page/user-details/user-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'users/edit/:id', component: UserEditComponent},
  {path: 'users/details/:id', component: UserDetailsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/details/:id', component: ProjectDetailsComponent},
  {path: 'projects/create', component: ProjectCreateComponent},
  {path: 'projects/edit/:id', component: ProjectEditComponent},
  {path: 'functionalities', component: FunctionalitiesComponent},
  {path: 'functionalities/create', component: FunctionalitiesCreateComponent},
  {path: 'functionalities/details/:id', component: FunctionalitiesDetailsComponent},
  {path: 'functionalities/edit/:id', component: FunctionalitiesEditComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks/create', component: TaskCreateComponent},
  {path: 'tasks/details/:id', component: TaskDetailsComponent},
  {path: 'tasks/edit/:id', component: TaskEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
