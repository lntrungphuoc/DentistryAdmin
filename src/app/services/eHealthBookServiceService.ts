import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EHealthBookService } from "../entities/eHealthBookService";

@Injectable({
    providedIn: 'root',
})

export class EHealthBookServiceService {
    constructor(private http: HttpClient) {}

    getByEHealthBookId(id: number): Observable<EHealthBookService[]> {
        return this.http.get<EHealthBookService[]>("https://localhost:7011/eHealthBookService/" + id);
    }

    create(eHealthBookService: EHealthBookService) {
        return this.http.post("https://localhost:7011/eHealthBookService/create", eHealthBookService).toPromise();
    }

    update(eHealthBookService: EHealthBookService) {
        return this.http.put("https://localhost:7011/eHealthBookService/update", eHealthBookService);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBookService/delete?id=" + id)
    }

    deleteRange(idEHealthBook: number) {
        return this.http.delete("https://localhost:7011/eHealthBookService/deleteRange?idEHealthBook=" + idEHealthBook).toPromise()
    }
}