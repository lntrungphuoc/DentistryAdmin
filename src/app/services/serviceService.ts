import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Service } from "../entities/service";

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

    create(service: Service) {
        return this.http.post("https://localhost:7011/service/create", service);
    }

    update(service: Service) {
        return this.http.put("https://localhost:7011/service/update", service);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/service/delete?id=" + id);
    }

    calculateFee(services: Service[]) {
        var headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
        var body = JSON.stringify(services);console.log(body)
        return this.http.post("https://localhost:7011/service/calculate", body, {headers: headers});
    }
}