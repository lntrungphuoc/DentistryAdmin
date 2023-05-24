import { EHealthBook } from "./eHealthBook";
import { Service } from "./service";

export class EHealthBookService {
    id: number;
    idEHealthBook: number;
    idService: number;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    eHealthBook: EHealthBook;
    service: Service;
}