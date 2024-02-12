import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  create(item: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  update(id: string, item: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<T> {
    throw new Error('Method not implemented.');
  }
  get(id: string): Observable<T> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<T[]> {
    throw new Error('Method not implemented.');
  }
}