import { Clinic } from "./clinic";
import { Customer } from "./customer";
import { EHealthBookDetail } from "./eHealthBookDetail";
import { EHealthBookService } from "./eHealthBookService";

export class EHealthBook {
    id: number;
    totalFee: number;
    idClinic: number;
    idCustomer: number;
    checkUpDate: Date;
    reExaminationDate: Date;
    note: string;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    clinic: Clinic;
    customer: Customer;
    eHealthBookDetails: EHealthBookDetail[];
    eHealthBookServices: EHealthBookService[];
}