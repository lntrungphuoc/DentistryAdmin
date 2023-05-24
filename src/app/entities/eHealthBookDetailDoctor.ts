import { Doctor } from "./doctor";
import { EHealthBookDetail } from "./eHealthBookDetail";

export class EHealthBookDetailDoctor {
    id: number;
    idDoctor: number;
    idEHealthBookDetail: number;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    doctor: Doctor;
    eHealthBookDetail: EHealthBookDetail;
}