import { Clinic } from "./clinic";

export class AppointmentSchedule{
    id: number;
    idClinic: number;
    name: string;
    phoneNumber: string;
    date: Date;
    time: Date;
    content: string;
    isConfirm: boolean;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    clinic: Clinic;
}