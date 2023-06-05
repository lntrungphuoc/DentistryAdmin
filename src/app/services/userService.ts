import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticatedResponse } from "../entities/authenticatedResponse";
import { LoginRequest } from "../entities/loginRequest";
import { Service } from "../entities/service";
import { User } from "../entities/user";
import { ResponseData } from "../entities/responseData";

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>("https://localhost:7011/user");
    }

    login(loginRequest: LoginRequest): Observable<AuthenticatedResponse> {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set("Content-Type", "application/json")
        return this.http.post<AuthenticatedResponse>("https://localhost:7011/user/login", loginRequest, { headers: headers });
    }

    getLoggedInfo(userName: string): Promise<User> {
        return this.http.get<User>("https://localhost:7011/user/getLoggedInfo?userName=" + userName).toPromise();
    }

    create(user: User): Observable<ResponseData> {
        return this.http.post<ResponseData>("https://localhost:7011/user/create", user);
    }

    update(user: User) {
        return this.http.put("https://localhost:7011/user/update", user);
    }

}