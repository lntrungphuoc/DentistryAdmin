import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../entities/role";

@Injectable({
    providedIn: 'root',
})

export class RoleService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Role[]> {
        return this.http.get<Role[]>("https://localhost:7011/role/getAll");
    }
}