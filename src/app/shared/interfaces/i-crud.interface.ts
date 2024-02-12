import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ICrud<T> {

    create(item: T, endPoint: string, options?: any): Observable<HttpEvent<T>>;

    update(id: string, item: T, endPoint: string, options?: any): Observable<HttpEvent<T>>;

    delete(id: string, endPoint: string, options?: any): Observable<HttpEvent<T>>;

    get(id: string, endPoint: string, options?: any): Observable<HttpEvent<T>>;

    getAll(endPoint: string, options?: any): Observable<HttpEvent<T[]>>;
}