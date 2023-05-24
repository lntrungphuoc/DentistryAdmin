import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../entities/customer";
import { ResponseData } from "../entities/responseData";

@Injectable({
    providedIn: 'root',
})

export class CustomerService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>("https://localhost:7011/customer");
    }

    login(cCCD: string, password: string) {
        var loginRequest = {
            cCCD: cCCD,
            password: password
        }
        return this.http.post("https://localhost:7011/customer/login", loginRequest);
    }

    create(customer: Customer): Observable<ResponseData> {
        const headers: HttpHeaders = new HttpHeaders();
        const token = localStorage.getItem('jwt');
        headers.set('Authorization', `Bearer ${token}`)
        return this.http.post<ResponseData>("https://localhost:7011/customer/create", customer, {headers: headers});
    }

    update(customer: Customer): Observable<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/customer/update", customer);
    }

    delete(id: number): Observable<ResponseData> {
        return this.http.delete<ResponseData>("https://localhost:7011/customer/delete?id=" + id);
    }
}