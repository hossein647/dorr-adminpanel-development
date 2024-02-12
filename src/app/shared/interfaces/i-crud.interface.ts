import { Observable } from "rxjs";

export interface ICrud<T> {

    create(item: T): Observable<T>;

    update(id: string, item: T): Observable<T>;

    delete(id: string): Observable<T>;

    get(id: string): Observable<T>;

    getAll(): Observable<T[]>;
}