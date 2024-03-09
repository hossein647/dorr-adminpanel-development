import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
// import { Observable,T>catchError, shareReplay, throwError } from 'rxj';
import { ICrud } from 'src/app/shared/interfaces/i-crud.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> implements ICrud<T> {

  baseApi: string = environment.url;

  constructor(
    private http: HttpClient,
  ) {}


  create<T>(item: T, endPoint: string, withCredentials: boolean): Observable<T> {
    return this.http.post<T>(`${this.baseApi}/${endPoint}`, item, { withCredentials })
      .pipe(
        catchError((err) => throwError(() => err))
      )
  }



  update<T>(id: string, item: T, endPoint: string, withCredentials: boolean): Observable<T> {
    return this.http.put<T>(`${this.baseApi}/${endPoint}/${id}`, item, { withCredentials })
      .pipe(
        catchError((err) => throwError(() => err))
      )
  }



  delete<T>(id: string, endPoint: string, withCredentials: boolean): Observable<T> {
    return this.http.delete<T>(`${this.baseApi}/${endPoint}/${id}`, { withCredentials })
      .pipe(
        catchError((err) => throwError(() => err))
      )
  }



  get<T>(id: string, endPoint: string, withCredentials: boolean): Observable<T> {
    return this.http.get<T>(`${this.baseApi}/${endPoint}/${id}`, { withCredentials })
      .pipe(
        catchError((err) => throwError(() => err))
      )
  }



  getAll<T>(endPoint: string, withCredentials: boolean): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseApi}/${endPoint}`, { withCredentials })
      .pipe(
        catchError((err) => throwError(() => err))
      )
  }
}