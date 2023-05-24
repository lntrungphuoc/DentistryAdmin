import { EHealthBookDetail } from "./eHealthBookDetail";

export class Attachment {
    id: number;
    uRL: string;
    fileName: string;
    idEHealthBookDetail: number;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    eHealthBookDetail: EHealthBookDetail;
}