import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentSchedule } from '../entities/appointmentSchedule';
import { Clinic } from '../entities/clinic';
import { AppointmentScheduleService } from '../services/appointmentScheduleService';
import { ClinicService } from '../services/clinicService';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.css'],
})
export class AppointmentScheduleComponent implements OnInit {
  clinics: Clinic[];
  appointmentSchedules: AppointmentSchedule[];
  appointmentSchedule = new AppointmentSchedule();
  appointmentScheduleUpdate = new AppointmentSchedule();
  deleteId: number;
  time: string;
  confirmId: number;
  responseMessage: string = '';
  @ViewChild('closeAddButton') closeAddButton;
  @ViewChild('closeEditButton') closeEditButton;
  @ViewChild('closeDeleteButton') closeDeleteButton;
  @ViewChild('closeConfirmButton') closeConfirmButton;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private clinicService: ClinicService,
    private appointmentScheduleService: AppointmentScheduleService
  ) { }

  ngOnInit(): void {
    this.appointmentSchedules = [];
    this.appointmentScheduleService.getAll().subscribe((res) => {
      this.appointmentSchedules = res;
      $(function () {
        $("#all-appointment-table").DataTable();
      });
      this.dtTrigger.next();
    });
    this.getClinic();
  }

  loadData() {
    this.appointmentSchedules = [];
    this.appointmentScheduleService.getAll().subscribe((res) => {
      this.appointmentSchedules = res;
    });
    // this.getClinic();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
        this.closeEditModal();
        this.responseMessage = response.message;
        this.showResponseModal();
        // this.loadData();
      });
  }

  onDelete() {
    this.appointmentScheduleService
      .delete(this.deleteId)
      .subscribe((res) => {
        this.closeDeleteModal();
        this.responseMessage = res.message;
        this.showResponseModal();
        // this.loadData();
      });
  }

  onSubmit(form) {
    var data = form.value;
    this.appointmentSchedule.idClinic = data.clinic;
    this.appointmentSchedule.date = data.date;
    var strDate = data.date.toString() + 'T' + data.time + ':00.0000000';
    this.appointmentSchedule.time = new Date(strDate);
    this.appointmentSchedule.time.setMinutes(
      this.appointmentSchedule.time.getMinutes() + 420
    );
    this.appointmentSchedule.name = data.name;
    this.appointmentSchedule.phoneNumber = data.phoneNumber;
    this.appointmentSchedule.content = data.content;
    this.appointmentScheduleService
      .create(this.appointmentSchedule)
      .subscribe((response) => {
        this.responseMessage = response.message;
        this.closeAddModal();
        this.showResponseModal();
        // this.loadData();
      });
    form.reset();
  }

  getConfirmId(i: number) {
    this.confirmId = this.appointmentSchedules[i].id;
  }

  confirmAppointment() {
    this.appointmentScheduleService.confirmAppointment(this.confirmId).subscribe((res) => {
      this.responseMessage = res.message;
      this.closeConfirmModal();
      this.showResponseModal();
      // this.loadData();
    });
  }

  showResponseModal() {
    document.getElementById("openModalButton").click();
  }

  closeAddModal() {
    this.closeAddButton.nativeElement.click();
  }

  closeDeleteModal() {
    this.closeDeleteButton.nativeElement.click();
  }

  closeEditModal() {
    this.closeEditButton.nativeElement.click();
  }

  closeConfirmModal() {
    this.closeConfirmButton.nativeElement.click();
  }

  reloadPage() {
    window.location.reload();
  }
}
