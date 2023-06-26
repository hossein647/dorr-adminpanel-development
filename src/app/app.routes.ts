import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'login',
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
        pathMatch: 'full' 
    },
    { 
        path: 'register', 
        loadComponent: () => import('./auth/register/register.component').then((m) => m.RegisterComponent),
        pathMatch: 'full' 
    },
    { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent), 
        children: [
            {
                path: '',
                loadComponent: () => import('./component/home/home.component').then((c) => c.HomeComponent)
            },
            {
                path: 'new-post',
                loadComponent: () => import('./component/new-post/new-post.component').then((c) => c.NewPostComponent)
            }
        ]
    },
];
