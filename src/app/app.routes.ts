import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
        
    },
    { 
        path: 'auth/login', 
        loadComponent: () => import('./auth/auth.component').then((m) => m.AuthComponent),
        canActivate: [authGuard],
        data: [{ route: 'auth' }],
    },
    { 
        path: 'auth/register', 
        loadComponent: () => import('./auth/auth.component').then((m) => m.AuthComponent),
        canActivate: [authGuard],
        data: [{ route: 'auth' }],
    },
    { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [authGuard],
        data: [ { route: 'dashboard'}],
        children: [
            {
                path: '',
                loadComponent: () => import('./menu/home/home.component').then((c) => c.HomeComponent),
                pathMatch: 'full',
            },
            {
                path: 'creator',
                loadComponent: () => import('./menu/creator/creator.component').then((c) => c.CreatorComponent),
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];