import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PriceList } from "../entities/priceList";

@Injectable({
    providedIn: 'root',
})

export class PriceListService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<PriceList[]> {
        return this.http.get<PriceList[]>("https://localhost:7011/price-list");
    }

    getByURL(url: string): Observable<PriceList> {
        return this.http.get<PriceList>("https://localhost:7011/price-list/" + url);
    }

    create(priceList: PriceList) {
        return this.http.post("https://localhost:7011/price-list/create", priceList);
    }

    update(priceList: PriceList) {
        return this.http.put("https://localhost:7011/price-list/update", priceList);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/price-list/delete?id=" + id);
    }
}