import { UpdateAttachmentRequest } from './../entities/updateAttachmentRequest';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ListAttachmentRequest } from "../entities/listAttachmentRequest";
import { Attachment } from "../entities/attachment";

@Injectable({
    providedIn: 'root',
})

export class AttachmentService {
    constructor(private http: HttpClient) { }

    async create(attachment: ListAttachmentRequest) {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set("Content-Type", "multipart/form-data;");
        const request: FormData = new FormData();
        request.append('IdEHealthBookDetail', JSON.stringify(attachment.idEHealthBookDetail));
        request.append('ListURL', attachment.listURL)
        console.log(request)
        await this.http.post("https://localhost:7011/attachment/create", request, { headers: headers })
            .toPromise()
    }

    update(updateAttachmentRequest: UpdateAttachmentRequest) {
        return this.http.put("https://localhost:7011/attachment/update", updateAttachmentRequest).toPromise();
    }

    getByEHealthBookDetail(id: number) {
        return this.http.get("https://localhost:7011/attachment?id=" + id);
    }

    download(img, name) {
        const imgUrl = img;
        const imgName = name;
        this.http
          .get(imgUrl, { responseType: "blob" as "json", headers : { "Content-Type": "application/x-www-form-urlencoded"} })
          .subscribe((res: any) => {
            const file = new Blob([res], { type: res.type });
    
            // IE
            // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            //   window.navigator.msSaveOrOpenBlob(file);
            //   return;
            // }
    
            const blob = window.URL.createObjectURL(file);
            const link = document.createElement("a");
            link.href = blob;
            link.download = imgName;
    
            // Version link.click() to work at firefox
            link.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              })
            );
    
            setTimeout(() => {
              // firefox
              window.URL.revokeObjectURL(blob);
              link.remove();
            }, 100);
          });
      }
}