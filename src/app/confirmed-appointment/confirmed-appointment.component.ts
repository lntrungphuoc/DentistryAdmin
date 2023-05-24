import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentSchedule } from '../entities/appointmentSchedule';
import { Clinic } from '../entities/clinic';
import { AppointmentScheduleService } from '../services/appointmentScheduleService';
import { ClinicService } from '../services/clinicService';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmed-appointment',
  templateUrl: './confirmed-appointment.component.html',
  styleUrls: ['./confirmed-appointment.component.css']
})
export class ConfirmedAppointmentComponent implements OnInit {
  clinics: Clinic[];
  appointmentSchedules: AppointmentSchedule[];
  appointmentSchedule = new AppointmentSchedule();
  appointmentScheduleUpdate = new AppointmentSchedule();
  deleteId: number;
  responseMessage: string;
  time: string;
  confirmId: number;
  @ViewChild('closeEditButton') closeEditButton;
  @ViewChild('closeDeleteButton') closeDeleteButton;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private clinicService: ClinicService,
    private appointmentScheduleService: AppointmentScheduleService) { }

  ngOnInit(): void {
    this.appointmentScheduleService.getConfirmedAppointment().subscribe((res) => {
      this.appointmentSchedules = res;
      $(function () {
        $("#confirmed-appointment-table").DataTable();
      });
      this.dtTrigger.next();
    });
    this.getClinic();
  }

  loadData() {
    this.appointmentSchedules = [];
    this.appointmentScheduleService.getConfirmedAppointment().subscribe((res) => {
      this.appointmentSchedules = res;
    });
    this.getClinic();
  }

  getClinic(): void {
    this.clinicService.getAll().subscribe(
      (data) => {
        this.clinics = data;
      },
      (error) => console.log(error)
    );
  }

  getUpdateInfo(i: number) {

    this.time = !!this.appointmentSchedules[i].time
      ? this.appointmentSchedules[i].time
        .toString()
        .split('T')[1]
        .split(':')
        .reduce((acc, elem, i, arr) =>
          i == arr.length - 1 ? acc : acc + ':' + elem
        )
      : '';

    this.appointmentScheduleUpdate.id = this.appointmentSchedules[i].id;
    this.appointmentScheduleUpdate.idClinic =
      this.appointmentSchedules[i].idClinic;
    this.appointmentScheduleUpdate.date = this.appointmentSchedules[i].date;
    this.appointmentScheduleUpdate.time = this.appointmentSchedules[i].time;
    this.appointmentScheduleUpdate.name = this.appointmentSchedules[i].name;
    this.appointmentScheduleUpdate.phoneNumber =
      this.appointmentSchedules[i].phoneNumber;
    this.appointmentScheduleUpdate.content =
      this.appointmentSchedules[i].content;
    console.log(this.appointmentScheduleUpdate);
  }

  getIdDelete(i: number) {
    this.deleteId = this.appointmentSchedules[i].id;
  }

  onUpdate() {
    if (this.appointmentScheduleUpdate.time.toString().split(':').length == 2) {
      var date = this.appointmentScheduleUpdate.date;
      var aDate: string[] = date.toString().split('T');
      var strDate = aDate[0] + 'T' + this.appointmentScheduleUpdate.time;

      this.appointmentScheduleUpdate.time = new Date(strDate);
      this.appointmentScheduleUpdate.time.setMinutes(
        this.appointmentScheduleUpdate.time.getMinutes() + 420
      );
    }
    this.appointmentScheduleService
      .update(this.appointmentScheduleUpdate)
      .subscribe((response) => {
        this.responseMessage = response.message;
        this.closeEditModal();
        this.showResponseModal();
        // this.loadData();
      });
  }

  onDelete() {
    this.appointmentScheduleService
      .delete(this.deleteId)
      .subscribe((res) => {
        this.responseMessage = res.message;
        this.closeDeleteModal();
        this.showResponseModal();
        // this.loadData();
      });
  }

  showResponseModal() {
    document.getElementById("openModalButton").click();
  }

  closeDeleteModal() {
    this.closeDeleteButton.nativeElement.click();
  }

  closeEditModal() {
    this.closeEditButton.nativeElement.click();
  }

  reloadPage() {
    window.location.reload();
  }
}
