import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { GenericHttp } from 'src/app/shared/services/generic-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseApi = environment.url;

  constructor(
    private http: GenericHttp,
  ) { }


  create(categoryName: string) {
    return this.http.post<Category>(`${this.baseApi}/category/create`, { name: categoryName }, { withCredentials: true });
  }


  getAll() {
    return this.http.getAll<Category>(`${this.baseApi}/category/all`);
  }



  getAllPaginate(limit: number, page: number) {
    const params = new HttpParams()
    .set('limit', limit)
    .set('page', page);
    return this.http.getAll<Category>(`${this.baseApi}/category/all-paginate`, { params, withCredentials: true });
  }



  update(category: Category) {
    return this.http.put<Category>(`${this.baseApi}/category/update/${category._id}`, category, { withCredentials: true });
  }
  
  

  remove(id: string) {
    return this.http.delete<Category>(`${this.baseApi}/category/remove/${id}`, { withCredentials: true });
  }
}
