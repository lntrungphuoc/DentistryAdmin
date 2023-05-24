import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticatedResponse } from "../entities/authenticatedResponse";
import { LoginRequest } from "../entities/loginRequest";
import { Service } from "../entities/service";
import { User } from "../entities/user";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor(private http: HttpClient) { }

    login(loginRequest: LoginRequest): Observable<AuthenticatedResponse> {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set("Content-Type", "application/json")
        return this.http.post<AuthenticatedResponse>("https://localhost:7011/user/login", loginRequest, { headers: headers });
    }

    getLoggedInfo(userName: string): Promise<User> {
        return this.http.get<User>("https://localhost:7011/user/getLoggedInfo?userName=" + userName).toPromise();
    }
}