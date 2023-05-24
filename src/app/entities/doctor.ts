import { EHealthBookDetailDoctor } from "./eHealthBookDetailDoctor";
import { User } from "./user";

export class Doctor {
    id: number;
    name: string;
    information: string;
    isDoctor: boolean;
    avatarURL: string;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: number;
    modifiedBy: number;
    eHealthBookDetailDoctor: EHealthBookDetailDoctor;
    user: User;
}