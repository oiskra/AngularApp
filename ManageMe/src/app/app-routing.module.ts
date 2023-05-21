import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './pages/usersPage/users.component';
import { ProjectsComponent } from './pages/projectsPage/projects.component';
import { FunctionalitiesComponent } from './pages/functionalitiesPage/functionalities.component';
import { TasksComponent } from './pages/tasksPage/tasks.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'functionalities', component: FunctionalitiesComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
