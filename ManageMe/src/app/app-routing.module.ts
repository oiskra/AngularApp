import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './pages/usersPage/users.component';
import { ProjectsComponent } from './pages/projects-page/projects.component';
import { FunctionalitiesComponent } from './pages/functionalitiesPage/functionalities.component';
import { TasksComponent } from './pages/tasksPage/tasks.component';
import { ProjectDetailsComponent } from './pages/projects-page/project-details/project-details.component';
import { ProjectCreateComponent } from './pages/projects-page/project-create/project-create.component';
import { ProjectEditComponent } from './pages/projects-page/project-edit/project-edit.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/details/:id', component: ProjectDetailsComponent},
  {path: 'projects/create', component: ProjectCreateComponent},
  {path: 'projects/edit/:id', component: ProjectEditComponent},
  {path: 'functionalities', component: FunctionalitiesComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
