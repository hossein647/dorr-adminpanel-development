import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isExistToken: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(err => {
        return throwError(() => {     
          const userUnautorized = err.status === 404;
          const userNotFound = err.status === 401;
          if (err instanceof HttpErrorResponse && (userUnautorized || userNotFound)){
            this.authService.isLoggedIn.update(status => status = false);
            this.authService.setStatusLogin(false)
            this.router.navigate(['auth/login']);
          } 
          return err;
        })
      })
    )
  }
}
