import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { News } from "../entities/news";

@Injectable({
    providedIn: 'root',
})

export class NewsService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<News[]> {
        return this.http.get<News[]>("https://localhost:7011/news");
    }

    getTop3(): Observable<News[]> {
        return this.http.get<News[]>("https://localhost:7011/news/top3newest");
    }

    getByURL(url: string): Observable<News> {
        return this.http.get<News>("https://localhost:7011/news/" + url);
    }

    create(news: News) {
        return this.http.post("https://localhost:7011/news/create", news);
    }

    update(news: News) {
        return this.http.put("https://localhost:7011/news/update", news);
    }

    delete(id: number) {
        return this.http.delete("https://localhost:7011/news/delete?id=" + id);
    }
}