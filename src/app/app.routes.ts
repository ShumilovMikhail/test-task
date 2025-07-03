import { Routes } from '@angular/router';

export const routes: Routes = [
  {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@tasks/tasks-list/tasks-list').then((c) => c.TasksList),
      },
  {
        path: 'tasks/:id',
        loadComponent: () => import('@tasks/task/task').then((c) => c.Task),
      },
];
