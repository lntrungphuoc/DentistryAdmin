import { EHealthBookDetailService } from "./eHealthBookDetailService";
import { EHealthBookService } from "./eHealthBookService";

export class Service {
    id: number;
    name: string;
    information: string;
    fee: number;
    url: string;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    eHealthBookServices: EHealthBookService[];
    eHealthBookDetailServices: EHealthBookDetailService[];
}