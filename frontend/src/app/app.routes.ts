import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    {
        path: 'tasks',
        loadComponent: () => import('./features/tasks/components/tasks-list/tasks-list').then(m => m.TasksList)
    },
    { path: '**', redirectTo: 'tasks' }
];
