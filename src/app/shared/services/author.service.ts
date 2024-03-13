import { Injectable } from '@angular/core';
import { Author, ICrud } from '../interfaces';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/services/core/crud.service';

@Injectable({
  providedIn: 'root'
})

export class AuthorService implements ICrud<Author> {

  constructor(
    private curdService: CrudService<Author>
  ) { }


  create<T>(item: T, endPoint: string, withCredentials: boolean): Observable<T> {
    throw new Error('Method not implemented.');
  }



  update<T>(id: string, item: T, endPoint: string, withCredentials: boolean): Observable<T> {
    throw new Error('Method not implemented.');
  }



  delete<T>(id: string, endPoint: string, withCredentials: boolean): Observable<T> {
    throw new Error('Method not implemented.');
  }



  get<T>(id: string, endPoint: string, withCredentials: boolean): Observable<T> {
    throw new Error('Method not implemented.');
  }



  getAll<Author>(endPoint: string, withCredentials: boolean): Observable<Author[]> {
    return this.curdService.getAll(endPoint, withCredentials)
  }

}