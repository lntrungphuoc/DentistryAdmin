import { Clinic } from "./clinic";
import { Customer } from "./customer";
import { Doctor } from "./doctor";
import { EHealthBookDetail } from "./eHealthBookDetail";
import { EHealthBookService } from "./eHealthBookService";

export class EHealthBook {
    id: number;
    totalFee: number;
    idClinic: number;
    idCustomer: number;
    idDoctorInCharge: number;
    checkUpDate: Date;
    reExaminationDate: Date;
    note: string;
    createdDate: Date;
    createdBy: number;
    modifiedDate: Date;
    modifiedBy: number;
    doctor: Doctor;
    clinic: Clinic;
    customer: Customer;
    eHealthBookDetails: EHealthBookDetail[];
    eHealthBookServices: EHealthBookService[];
}