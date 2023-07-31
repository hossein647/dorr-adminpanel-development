import { Injectable, signal } from '@angular/core';
import { GenericHttp } from '../shared/services/generic-http.service';
import { User } from '../shared/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApi = environment.url;
  isLoggedIn = signal<boolean>(false);


  constructor(
    private genericHttp: GenericHttp,
  ) { }



  login(user: User) {
    return this.genericHttp
      .post<User>(`${this.baseApi}/auth/login`, user, { withCredentials: true })
      .pipe(
        map((res: any) => {
          if (res.statusCode === 200) {
            this.isLoggedIn.update((status => status = true));
            this.setStatusLogin(this.isLoggedIn());
            return res;
          } else {
            this.isLoggedIn.update((status => status = false));
            this.setStatusLogin(this.isLoggedIn());
          }
          return res;
        })
      );
  }



  register(user: User) {
    return this.genericHttp.post<any>(`${this.baseApi}/auth/register`, user, { withCredentials: true })
  }



  logout() {
    return this.genericHttp.get<any>(`${this.baseApi}/auth/logout`, { withCredentials: true })
  }


  
  isExistToken() {
    return this.genericHttp.get<any>(`${this.baseApi}/auth/has-token`, { withCredentials: true })
  }



  setStatusLogin(status: boolean) {
    localStorage.setItem('isLogin', JSON.stringify(status));
  }



  getStatusLogin(): boolean {
    if (localStorage.getItem('isLogin')) {
      return JSON.parse(localStorage.getItem('isLogin') || '');
    }
    return false;
  }
}
