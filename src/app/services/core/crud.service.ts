import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, shareReplay, throwError } from 'rxjs';
import { ICrud } from 'src/app/shared/interfaces/i-crud.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> implements ICrud<T> {

  baseApi: string = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  create(item: T, endPoint: string, options: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(`${this.baseApi}/${endPoint}`, item, options)
      .pipe(
        shareReplay(),
        catchError((err) => throwError(() => of(err)))
    )
  }



  update(id: string, item: T, endPoint: string, options: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(`${this.baseApi}/${endPoint}/${id}`, item, options)
      .pipe(
        shareReplay(),
        catchError((err) => throwError(() => of(err)))
      )
  }



  delete(id: string): Observable<HttpEvent<T>> {
    throw new Error('Method not implemented.');
  }



  get(id: string): Observable<HttpEvent<T>> {
    throw new Error('Method not implemented.');
  }



  getAll(): Observable<HttpEvent<T[]>> {
    throw new Error('Method not implemented.');
  }
}