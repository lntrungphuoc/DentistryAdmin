import { Attachment } from "./attachment";
import { Clinic } from "./clinic";
import { Doctor } from "./doctor";
import { EHealthBook } from "./eHealthBook";
import { EHealthBookDetailDoctor } from "./eHealthBookDetailDoctor";
import { EHealthBookDetailService } from "./eHealthBookDetailService";

export class EHealthBookDetail {
    id: number;
    diagnose: string;
    medicine: string;
    idEHealthBook: number;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    eHealthBook: EHealthBook;
    attachments: Attachment[];
    eHealthBookDetailDoctor: EHealthBookDetailDoctor[]
    eHealthBookDetailServices: EHealthBookDetailService[]
}