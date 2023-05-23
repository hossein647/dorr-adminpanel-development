import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { 
        path: '', loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
        children: [],
        pathMatch: 'full' 
    }
];
