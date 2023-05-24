import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EHealthBookDetailDoctor } from "../entities/eHealthBookDetailDoctor";

@Injectable({
    providedIn: 'root',
})

export class EHealthBookDetailDoctorService {
    constructor(private http: HttpClient) {}

    getByEHealthBookDetailId(id: number): Observable<EHealthBookDetailDoctor[]> {
        return this.http.get<EHealthBookDetailDoctor[]>("https://localhost:7011/eHealthBookDetailDoctor/" + id);
    }

    create(eHealthBookDetailDoctor: EHealthBookDetailDoctor) {
        return this.http.post("https://localhost:7011/eHealthBookDetailDoctor/create", eHealthBookDetailDoctor).toPromise();
    }

    update(eHealthBookDetailDoctor: EHealthBookDetailDoctor) {
        return this.http.put("https://localhost:7011/eHealthBookDetailDoctor/update", eHealthBookDetailDoctor)
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBookDetailDoctor/delete?id=" + id);
    }

    deleteRange(id: number) {
        return this.http.delete("https://localhost:7011/eHealthBookDetailDoctor/deleteRange?id=" + id).toPromise();
    }
}