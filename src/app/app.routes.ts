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
                loadComponent: () => import('./component/home/home.component').then((c) => c.HomeComponent),
                pathMatch: 'full',
            },
            {
                path: 'articles',
                loadComponent: () => import('./component/article/home-article/home-article.component').then((c) => c.HomeArticleComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./component/article/articles/articles.component').then((c) => c.ArticlesComponent),
                    },
                    {
                        path: 'new',
                        loadComponent: () => import('./component/article/new-article/new-article.component').then((c) => c.NewArticleComponent),
                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('./component/article/new-article/new-article.component').then((c) => c.NewArticleComponent),
                    },
                ]
            },
            {
                path: 'categories',
                loadComponent: () => import('./component/category/home-category/home-category.component').then((c) => c.HomeCategoryComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./component/category/categories/categories.component').then((c) => c.CategoriesComponent),
                    },
                    {
                        path: 'new',
                        loadComponent: () => import('./component/category/new-category/new-category.component').then((c) => c.NewCategoryComponent),
                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('./component/category/new-category/new-category.component').then((c) => c.NewCategoryComponent),
                    },
                ]
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];