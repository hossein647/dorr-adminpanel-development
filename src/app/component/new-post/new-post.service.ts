import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { GenericHttp } from 'src/app/shared/generic-http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  baseApi = environment.url;

  constructor(
    private genericHttp: GenericHttp,
  ) { }


  create<Post>(data: Post): Observable<Post> {
    return this.genericHttp.post(`${this.baseApi}/create`, data);
  }


  
}
