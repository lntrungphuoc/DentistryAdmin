import { AppointmentSchedule } from "./appointmentSchedule";
import { EHealthBook } from "./eHealthBook";

export class Clinic {
    id: number;
    address: string;
    phoneNumber: string;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    appointmentSchedules: AppointmentSchedule[];
    eHealthBooks: EHealthBook[];
}