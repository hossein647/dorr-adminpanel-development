import { Injectable } from '@angular/core';
import { Book, ICrud } from '../interfaces';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/services/core/crud.service';

@Injectable({
  providedIn: 'root'
})

export class BookService implements ICrud<Book> {

  constructor(
    private crudService: CrudService<Book>
  ) { }


  create<Book>(item: Book, endPoint: string, withCredentials: boolean): Observable<Book> {
    return this.crudService.create(item, endPoint, withCredentials);
  }


  update<Book>(id: string, item: Book, endPoint: string, withCredentials: boolean): Observable<Book> {
    return this.crudService.update(id, item, endPoint, withCredentials);
  }


  delete<Book>(id: string, endPoint: string, withCredentials: boolean): Observable<Book> {
    return this.crudService.delete(id, endPoint, withCredentials);
  }


  get<Book>(id: string, endPoint: string, withCredentials: boolean): Observable<Book> {
    return this.crudService.get(id, endPoint, withCredentials);
  }


  getAll<Book>(endPoint: string, withCredentials: boolean): Observable<Book[]> {
    return this.crudService.getAll(endPoint, withCredentials);
  }

}
