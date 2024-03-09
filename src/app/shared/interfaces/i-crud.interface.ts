import { HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class ICrud<T> {

    abstract create<T>(item: T, endPoint: string, withCredentials: boolean): Observable<T>;

    abstract update<T>(id: string, item: T, endPoint: string, withCredentials: boolean): Observable<T>;

    abstract delete<T>(id: string, endPoint: string, withCredentials: boolean): Observable<T>;

    abstract get<T>(id: string, endPoint: string, withCredentials: boolean): Observable<T>;

    abstract getAll<T>(endPoint: string, withCredentials: boolean): Observable<T[]>;
}