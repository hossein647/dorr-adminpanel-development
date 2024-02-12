import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ICrud<T> {

    create(item: T, endPoint: string, options: any): Observable<HttpEvent<T>>;

    update(id: string, item: T): Observable<HttpEvent<T>>;

    delete(id: string): Observable<HttpEvent<T>>;

    get(id: string): Observable<HttpEvent<T>>;

    getAll(): Observable<HttpEvent<T[]>>;
}