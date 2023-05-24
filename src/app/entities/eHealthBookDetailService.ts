import { EHealthBookDetail } from "./eHealthBookDetail";
import { Service } from "./service";

export class EHealthBookDetailService {
    id: number;
    idEHealthBookDetail: number;
    idService: number;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    eHealthBookDetail: EHealthBookDetail;
    service: Service;
}