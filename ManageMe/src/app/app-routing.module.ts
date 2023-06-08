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
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { DevopsGuard } from 'src/guards/devops.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'auth/login', component: LoginComponent, outlet: 'auth'},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'users/details/:id', component: UserDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'projects/details/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard]},
  {path: 'projects/create', component: ProjectCreateComponent, canActivate: [AuthGuard, DevopsGuard]},
  {path: 'projects/edit/:id', component: ProjectEditComponent, canActivate: [AuthGuard, DevopsGuard]},
  {path: 'functionalities', component: FunctionalitiesComponent, canActivate: [AuthGuard]},
  {path: 'functionalities/create', component: FunctionalitiesCreateComponent, canActivate: [AuthGuard, DevopsGuard]},
  {path: 'functionalities/details/:id', component: FunctionalitiesDetailsComponent, canActivate: [AuthGuard]},
  {path: 'functionalities/edit/:id', component: FunctionalitiesEditComponent, canActivate: [AuthGuard, DevopsGuard]},
  {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
  {path: 'tasks/create', component: TaskCreateComponent, canActivate: [AuthGuard]},
  {path: 'tasks/details/:id', component: TaskDetailsComponent, canActivate: [AuthGuard]},
  {path: 'tasks/edit/:id', component: TaskEditComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
