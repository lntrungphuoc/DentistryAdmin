import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Clinic } from "../entities/clinic";

@Injectable({
    providedIn: 'root',
})

export class ClinicService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Clinic[]> {
        return this.http.get<Clinic[]>("https://localhost:7011/clinic");
    }

    create(clinic: Clinic) {
        return this.http.post("https://localhost:7011/clinic/create", clinic);
    }

    update(clinic: Clinic) {
        return this.http.put("https://localhost:7011/clinic/update", clinic);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/clinic/delete?id=" + id);
    }
}