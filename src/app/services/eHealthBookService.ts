import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EHealthBook } from "../entities/eHealthBook";
import { ResponseData } from "../entities/responseData";

@Injectable({
    providedIn: 'root',
})

export class EHealthBookService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<EHealthBook[]> {
        return this.http.get<EHealthBook[]>("https://localhost:7011/eHealthBook");
    }

    getByIdUser(id: number) {
        return this.http.get("https://localhost:7011/eHealthBook/" + id);
    }

    getById(id: number): Observable<EHealthBook> {
        return this.http.get<EHealthBook>("https://localhost:7011/eHealthBook/getById?id=" + id);
    }

    getNewest(): Observable<EHealthBook> {
        return this.http.get<EHealthBook>("https://localhost:7011/eHealthBook/newest");
    }

    create(eHealthBook: EHealthBook) {
        return this.http.post("https://localhost:7011/eHealthBook/create", eHealthBook);
    }

    createPromise(eHealthBook: EHealthBook): Promise<ResponseData> {
        return this.http.post<ResponseData>("https://localhost:7011/eHealthBook/create", eHealthBook).toPromise();
    }

    update(eHealthBook: EHealthBook): Promise<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/eHealthBook/update", eHealthBook).toPromise();
    }

    delete(id: number): Observable<ResponseData> {
        return this.http.delete<ResponseData>("https://localhost:7011/eHealthBook/delete?id=" + id);
    }
}