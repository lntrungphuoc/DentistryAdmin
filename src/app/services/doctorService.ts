import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "../entities/doctor";

@Injectable({
    providedIn: 'root',
})

export class DoctorService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>("https://localhost:7011/doctor");
    }

    create(doctor: Doctor) {
        return this.http.post("https://localhost:7011/doctor/create", doctor);
    }

    update(doctor: Doctor) {
        return this.http.put("https://localhost:7011/doctor/update", doctor);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/doctor/delete?id=" + id);
    }
}