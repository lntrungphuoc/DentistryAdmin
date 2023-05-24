import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseData } from "../entities/responseData";
import { EHealthBookDetail } from "../entities/eHealthBookDetail";


@Injectable({
    providedIn: 'root',
})

export class EHealthBookDetailService {
    constructor(private http: HttpClient) {}

    create(eHealthBookDetail: EHealthBookDetail): Promise<ResponseData> {
        return this.http.post<ResponseData>("https://localhost:7011/eHealthBookDetail/create", eHealthBookDetail).toPromise();
    }

    update(eHealthBookDetail: EHealthBookDetail): Promise<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/eHealthBookDetail/update", eHealthBookDetail).toPromise();
    }

    getListDetailByEBookID(id: number): Observable<EHealthBookDetail[]> {
        return this.http.get<EHealthBookDetail[]>("https://localhost:7011/eHealthBookDetail/" + id);
    }

    delete(id: number): Observable<ResponseData> {
        return this.http.delete<ResponseData>("https://localhost:7011/eHealthBookDetail/delete?id=" + id);
    }
}