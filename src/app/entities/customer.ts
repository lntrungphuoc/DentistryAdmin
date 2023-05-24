import { EHealthBook } from "./eHealthBook";

export class Customer {
    id: number;
    customerName: string;
    phoneNumber: string;
    address: string;
    password: string;
    cccd: string;
    bhyt: string
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    eHealthBooks: EHealthBook[];
}