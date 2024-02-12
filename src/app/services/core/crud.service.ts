import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICrud } from 'src/app/shared/interfaces/i-crud.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> implements ICrud<T> {

  constructor() { }
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