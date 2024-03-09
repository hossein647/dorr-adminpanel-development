import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ICrud } from '../interfaces';
import { CrudService } from 'src/app/services/core/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService<Category> implements ICrud<Category> {

  constructor(
    private http: HttpClient,
    private crudService: CrudService<Category>,
  ) { }
  create<Category>(item: Category, endPoint: string, withCredentials: boolean): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  update<Category>(id: string, item: Category, endPoint: string, withCredentials: boolean): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  delete<Category>(id: string, endPoint: string, withCredentials: boolean): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  get<Category>(id: string, endPoint: string, withCredentials: boolean): Observable<Category> {
    throw new Error('Method not implemented.');
  }


  getAll<Category>(endPoint: string, withCredentials: boolean): Observable<Category[]> {
    return this.crudService.getAll(endPoint, withCredentials);
  }
}
