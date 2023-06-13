import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Service } from "../entities/service";
import { ResponseData } from "../entities/responseData";

@Injectable({
    providedIn: 'root',
})

export class ServiceService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Service[]> {
        return this.http.get<Service[]>("https://localhost:7011/service");
    }

    getByURL(url: string): Observable<Service> {
        return this.http.get<Service>("https://localhost:7011/service/" + url);
    }

    create(service: Service): Observable<ResponseData> {
        return this.http.post<ResponseData>("https://localhost:7011/service/create", service);
    }

    update(service: Service): Observable<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/service/update", service);
    }

    delete(id: number): Observable<ResponseData> {
        return this.http.delete<ResponseData>("https://localhost:7011/service/delete?id=" + id);
    }

    calculateFee(services: Service[]) {
        var headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
        var body = JSON.stringify(services);console.log(body)
        return this.http.post("https://localhost:7011/service/calculate", body, {headers: headers});
    }
}