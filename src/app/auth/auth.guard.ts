import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localIsLogin = authService.getStatusLogin();
  
  
  const routePage = route.data[0].route;
  if (routePage === 'auth') {
    if (authService.isLoggedIn() || localIsLogin) {
      router.navigate(['/dashboard'])
      return false;
    }
    else return true;
  }
  if (routePage === 'dashboard') {
    if (authService.isLoggedIn() || localIsLogin) return true;
    else {
      router.navigate(['/auth/login'])
      return false;
    }
  }
  router.navigate(['/auth/login'])
  return false;
};
