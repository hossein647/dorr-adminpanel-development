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
        loadComponent: () => import('./layout/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [authGuard],
        data: [ { route: 'dashboard'}],
        children: [
            {
                path: '',
                loadComponent: () => import('./menu/home/home.component').then((c) => c.HomeComponent),
                pathMatch: 'full',
            },
            {
                path: 'manage-authors',
                // loadComponent: () => import('./menu/authors/authors.component').then((c) => c.AuthorsComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./menu/authors/read-authors/read-authors.component').then((c) => c.ReadAuthorsComponent),
                    },
                    {
                        path: 'create',
                        loadComponent: () => import('./menu/authors/create-author/create-author.component').then((c) => c.CreateAuthorComponent),
                    },
                ]
            },
            {
                path: 'manage-books',
                // loadComponent: () => import('./menu/books/books.component').then((c) => c.BooksComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./menu/books/read-book/read-book.component').then((c) => c.ReadBookComponent),
                        pathMatch: 'full'
                    },
                    {
                        path: 'create',
                        loadComponent: () => import('./menu/books/create-book/create-book.component').then((c) => c.CreateBookComponent)
                    }
                ]
            },
            {
                path: 'manage-categories',
                // loadComponent: () => import('./menu/categories/categories.component').then((c) => c.CategoriesComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./menu/categories/read-categories/read-categories.component').then((c) => c.ReadCategoriesComponent),
                        pathMatch: 'full'
                    },
                    {
                        path: 'create',
                        loadComponent: () => import('./menu/categories/create-category/create-category.component').then((c) => c.CreateCategoryComponent)
                    }
                ]
            },
            {
                path: 'manage-users',
                loadComponent: () => import('./menu/users/users.component').then((c) => c.UsersComponent),
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
