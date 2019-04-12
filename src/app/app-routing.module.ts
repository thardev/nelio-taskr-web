import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component'
import { CreatetaskComponent } from './createtask/createtask.component'

const routes: Routes = [
  {
    path: 'tasks',
    component: TasklistComponent,
    data: { title: 'List of tasks' }
  },
  {
    path: 'create-task',
    component: CreatetaskComponent,
    data: { title: 'Create a task' }
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
