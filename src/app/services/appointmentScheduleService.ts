import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AppointmentSchedule } from "../entities/appointmentSchedule";
import { ResponseData } from "../entities/responseData";

@Injectable({
    providedIn: 'root',
})

export class AppointmentScheduleService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<AppointmentSchedule[]> {
        return this.http.get<AppointmentSchedule[]>("https://localhost:7011/appointment-schedule");
    }

    create(appointmentSchedule: AppointmentSchedule): Observable<ResponseData> {
        return this.http.post<ResponseData>("https://localhost:7011/appointment-schedule/create", appointmentSchedule);
    }

    update(appointmentSchedule: AppointmentSchedule): Observable<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/appointment-schedule/update", appointmentSchedule);
    }

    delete(id: number): Observable<ResponseData> {
        return this.http.delete<ResponseData>("https://localhost:7011/appointment-schedule/delete?id=" + id);
    }

    confirmAppointment(id: number): Observable<ResponseData> {
        return this.http.put<ResponseData>("https://localhost:7011/appointment-schedule/confirm?id=" + id, {});
    }

    getConfirmedAppointment(): Observable<AppointmentSchedule[]> {
        return this.http.get<AppointmentSchedule[]>("https://localhost:7011/appointment-schedule/confirmed");
    }

    getHaveNotConfirmedAppointment(): Observable<AppointmentSchedule[]> {
        return this.http.get<AppointmentSchedule[]>("https://localhost:7011/appointment-schedule/have-not-confirmed");
    }
}