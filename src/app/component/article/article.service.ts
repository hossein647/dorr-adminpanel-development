import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { GenericHttp } from 'src/app/shared/services/generic-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseApi: string = environment.url;

  constructor(
    private http: GenericHttp,
  ) { }


  
  uploadImage(file: File): Observable<any> {    
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.baseApi}/article/image`, formData, { withCredentials: true });
  }



  create(article: Article){
    return this.http.post(`${this.baseApi}/article/create`, article, { withCredentials: true });
  }



  getAllPaginate(limit: number, page: number) {
    const params = new HttpParams()
    .set('limit', limit)
    .set('page', page);
    return this.http.getAll<Article>(`${this.baseApi}/article/all-paginate`, { params });
  }



  remove(id: string) {
    return this.http.delete<Article>(`${this.baseApi}/article/remove/${id}`, { withCredentials: true })
  }


  getSpeceficFile(key: string) {
    const params = new HttpParams().set('key', key);
    return this.http.get(`${this.baseApi}/article/get`, { params, withCredentials: true });
  }
  
  

  update(id: string, article: Article) {
    return this.http.put<Article>(`${this.baseApi}/article/update/${id}`, article, { withCredentials: true })
  }



  getDirectImage(url: string) {
    return this.http.get<any>(url, { responseType: 'blob', withCredentials: true });
  }
}
