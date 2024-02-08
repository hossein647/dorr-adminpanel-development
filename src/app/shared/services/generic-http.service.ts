import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericHttp {

  constructor(private http: HttpClient) { }


  get<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.get<T>(url, options)
      .pipe(
        catchError(err => throwError(() => err))
      )
  }
  
  
  getAll<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.get<T>(url, options)
      .pipe(
        catchError(err => throwError(() => err))
      )
  }


  post<T>(url: string, payload: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(url, payload, options)
      .pipe(
        catchError(err => throwError(() => err))
      )
  }


  put<T>(url: string, payload: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(url, payload, options)
      .pipe(
        catchError(err => throwError(() => err))
      )
  }


  delete<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.delete<T>(url, options)
      .pipe(
        catchError(err => throwError(() => err))
      )
  }
}
