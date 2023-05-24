import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EHealthBookDetailService } from "../entities/eHealthBookDetailService";

@Injectable({
    providedIn: 'root',
})

export class EHealthBookDetailServiceService {
    constructor(private http: HttpClient) {}

    getByEHealthBookDetailId(id: number): Observable<EHealthBookDetailService[]> {
        return this.http.get<EHealthBookDetailService[]>("https://localhost:7011/eHealthBookDetailService/" + id);
    }

    create(eHealthBookDetailService: EHealthBookDetailService) {
        return this.http.post("https://localhost:7011/eHealthBookDetailService/create", eHealthBookDetailService).toPromise();
    }

    update(eHealthBookDetailService: EHealthBookDetailService) {
        return this.http.put("https://localhost:7011/eHealthBookDetailService/update", eHealthBookDetailService);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBookDetailService/delete?id=" + id);
    }

    deleteRange(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBookDetailService/deleteRange?id=" + id).toPromise()
    }
}