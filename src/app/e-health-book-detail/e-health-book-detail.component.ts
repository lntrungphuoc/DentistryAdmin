import { UpdateAttachmentRequest } from './../entities/updateAttachmentRequest';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { element } from 'protractor';
import { async, observable, Observable, of, Subject } from 'rxjs';
import { Clinic } from '../entities/clinic';
import { Doctor } from '../entities/doctor';
import { EHealthBook } from '../entities/eHealthBook';
import { EHealthBookDetail } from '../entities/eHealthBookDetail';
import { EHealthBookDetailDoctor } from '../entities/eHealthBookDetailDoctor';
import { EHealthBookDetailService } from '../entities/eHealthBookDetailService';
import { ListAttachmentRequest } from '../entities/listAttachmentRequest';
import { Service } from '../entities/service';
import { AttachmentService } from '../services/attachmentService';
import { ClinicService } from '../services/clinicService';
import { DoctorService } from '../services/doctorService';
import { EHealthBookDetailDoctorService } from '../services/eHealthBookDetailDoctorService';
import { EHealthBookDetailService as EHealthBookDetailServices } from '../services/eHealthBookDetailService';
import { EHealthBookDetailServiceService } from '../services/eHealthBookDetailServiceService';
import { EHealthBookService } from '../services/eHealthBookService';
import { ServiceService } from '../services/serviceService';
import { switchMap } from 'rxjs/operators';
import { Attachment } from '../entities/attachment';
import { DataTableDirective } from 'angular-datatables';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';
@Component({
  selector: 'app-e-health-book-detail',
  templateUrl: './e-health-book-detail.component.html',
  styleUrls: ['./e-health-book-detail.component.css']
})
export class EHealthBookDetailComponent implements OnInit {
  eHealthBookDetail: EHealthBookDetail[];
  eHealthBook: EHealthBook;
  id: number;
  clinics: Clinic[];
  doctors: Doctor[];
  services: Service[];
  eHealthBookCreate: EHealthBookDetail = new EHealthBookDetail;
  eHealthBookUpdate: EHealthBookDetail = new EHealthBookDetail;
  selectedDoctor: Doctor[];
  selectedService: Service[];
  deleteId: number;
  attachment: ListAttachmentRequest = new ListAttachmentRequest();
  seletedAttachment: File[] = [];
  fee;
  updateFee;
  listAttachmentDownload: Attachment[];
  responseMessage: string = '';
  @ViewChild('closeAddButton') closeAddButton;
  @ViewChild('closeEditButton') closeEditButton;
  @ViewChild('closeDeleteButton') closeDeleteButton;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private route: ActivatedRoute,
    private eHealthBookService: EHealthBookService,
    private doctorService: DoctorService,
    private clinicService: ClinicService,
    private eHealthBookDetailService: EHealthBookDetailServices,
    private serviceService: ServiceService,
    private eHealthBookDetailServiceService: EHealthBookDetailServiceService,
    private eHealthBookDetailDoctorService: EHealthBookDetailDoctorService,
    private attachmentService: AttachmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.eHealthBookDetailService.getListDetailByEBookID(this.id).subscribe((res) => {
      this.eHealthBookDetail = res;
      $(function () {
        $("#health-book-detail-table").DataTable();
      });
      this.dtTrigger.next();
    })
    this.loadData();
  }

  loadData() {
    this.id = this.route.snapshot.params['id'];
    this.eHealthBookDetailService.getListDetailByEBookID(this.id).subscribe((res) => {
      this.eHealthBookDetail = res;
    })
    this.doctorService.getAll().subscribe((res) => {
      this.doctors = res
    });
    this.clinicService.getAll().subscribe((res) => this.clinics = res);
    this.serviceService.getAll().subscribe((res) => this.services = res);

    this.eHealthBookUpdate.eHealthBookDetailDoctor = []
    this.eHealthBookUpdate.eHealthBookDetailServices = []
    this.selectedDoctor = []
    this.selectedService = []
    this.seletedAttachment = []
    this.listAttachmentDownload = []
    // this.responseMessage = '';
  }

  async onCreate(form) {
    var data = form.value;
    this.eHealthBookCreate.diagnose = data.diagnose
    this.eHealthBookCreate.medicine = data.medicine;
    this.eHealthBookCreate.idEHealthBook = this.id;
    let listService: Service[] = data.service;
    let listDoctor: Service[] = data.doctor;

    var newEHealthBookDetail;

    await this.eHealthBookDetailService.create(this.eHealthBookCreate).then(res => {
      newEHealthBookDetail = res.data;
      this.responseMessage = res.message;
      console.log('mess'+this.responseMessage)
    })
    if (listService.length > 0) {
      of(listService).pipe(
        switchMap(services => {
          services.map(async (service) => {
            const createEHealthBookDetailService: EHealthBookDetailService = new EHealthBookDetailService();
            createEHealthBookDetailService.idEHealthBookDetail = newEHealthBookDetail.id;
            createEHealthBookDetailService.idService = service.id;
            await this.eHealthBookDetailServiceService.create(createEHealthBookDetailService).then(res => console.log(res))
          })
          return services;
        })
      ).subscribe();
    }

    if (listDoctor.length > 0) {
      of(listDoctor).pipe(
        switchMap((doctors) => {
          doctors.map(async (doctor) => {
            const createEHealthBookDoctor: EHealthBookDetailDoctor = new EHealthBookDetailDoctor();
            createEHealthBookDoctor.idDoctor = doctor.id;
            createEHealthBookDoctor.idEHealthBookDetail = newEHealthBookDetail.id;
            await this.eHealthBookDetailDoctorService.create(createEHealthBookDoctor).then(res => console.log(res));
          })
          return doctors;
        })
      ).subscribe()
    }

    if (this.seletedAttachment.length > 0) {
      of(this.seletedAttachment).pipe(
        switchMap((attachments) => {
          attachments.map(async (att) => {
            const createAttachment: ListAttachmentRequest = new ListAttachmentRequest();
            createAttachment.idEHealthBookDetail = newEHealthBookDetail.id;
            createAttachment.listURL = att
            await this.attachmentService.create(createAttachment).then(res => {
              console.log(res)
            })
          })
          return attachments;
        })
      ).subscribe(() => {
        this.closeAddModal();
        this.showResponseModal();
        form.reset();
        // this.loadData();
      })
    } else {
      this.closeAddModal();
      this.showResponseModal();
      form.reset();
      // this.loadData();
    }
    // window.location.reload();

  }

  handleFileInput(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.seletedAttachment.push(files.item(i))
    }
  }

  onSelectFile(file: any) {
    this.seletedAttachment.push(<File>file.target.files);
  }

  getUpdateInfo(i: number) {
    this.selectedDoctor = []
    this.selectedService = []
    this.eHealthBookUpdate.id = this.eHealthBookDetail[i].id;
    this.eHealthBookUpdate.diagnose = this.eHealthBookDetail[i].diagnose;
    this.eHealthBookUpdate.medicine = this.eHealthBookDetail[i].medicine;
    this.eHealthBookUpdate.idEHealthBook = this.id;
    this.eHealthBookUpdate.createdDate = this.eHealthBookDetail[i].createdDate;
    this.eHealthBookUpdate.createdBy = this.eHealthBookDetail[i].createdBy;
    this.getListAttachment(i);

    // this.eHealthBookUpdate.eHealthBookDetailDoctor.push(...this.eHealthBookDetail[i].eHealthBookDetailDoctor);
    this.selectedDoctor.push(...this.eHealthBookDetail[i].eHealthBookDetailDoctor.map(rs => rs.doctor));
    // console.log(this.selectedDoctor);
    this.selectedService.push(...this.eHealthBookDetail[i].eHealthBookDetailServices.map(rs => rs.service))
  }

  async onUpdate(form) {
    await this.eHealthBookDetailService.update(this.eHealthBookUpdate).then(res => {
      console.log(res)
      this.responseMessage = res.message;
    });

    await this.eHealthBookDetailDoctorService.deleteRange(this.eHealthBookUpdate.id).then(res => console.log(res));

    if (this.selectedDoctor.length > 0) {
      of(this.selectedDoctor).pipe(
        switchMap(doctors => {
          const x = doctors.map(async (doctor) => {
            const createEHealthBookDoctor: EHealthBookDetailDoctor = new EHealthBookDetailDoctor();
            createEHealthBookDoctor.idDoctor = doctor.id;
            createEHealthBookDoctor.idEHealthBookDetail = this.eHealthBookUpdate.id;
            await this.eHealthBookDetailDoctorService.create(createEHealthBookDoctor).then(res => console.log(res));
          })
          return doctors;
        })
      ).subscribe()
    };

    await this.eHealthBookDetailServiceService.deleteRange(this.eHealthBookUpdate.id).then(res => console.log(res));

    if (this.selectedService.length > 0) {
      of(this.selectedService).pipe(
        switchMap(services => {
          const x = services.map(async (service) => {
            const createEHealthBookDetailService: EHealthBookDetailService = new EHealthBookDetailService();

            createEHealthBookDetailService.idEHealthBookDetail = this.eHealthBookUpdate.id;
            createEHealthBookDetailService.idService = service.id;

            await this.eHealthBookDetailServiceService.create(createEHealthBookDetailService).then(res => console.log(res));

          })
          return services;
        })
      ).subscribe()
    }

    var updateAttachmentRequest: UpdateAttachmentRequest = new UpdateAttachmentRequest;
    updateAttachmentRequest.listAttachment = [];
    updateAttachmentRequest.listAttachment.push(...this.listAttachmentDownload);
    updateAttachmentRequest.idEHealthBookDetail = this.eHealthBookUpdate.id;
    await this.attachmentService.update(updateAttachmentRequest);
    console.log('file moi')
    console.log(this.seletedAttachment)
    if (this.seletedAttachment.length > 0) {
      of(this.seletedAttachment).pipe(
        switchMap((attachments) => {
          attachments.map(async (att) => {
            const createAttachment: ListAttachmentRequest = new ListAttachmentRequest();
            createAttachment.idEHealthBookDetail = this.eHealthBookUpdate.id;
            createAttachment.listURL = att
            await this.attachmentService.create(createAttachment).then(res => {
              console.log(res)
            })
          })
          return attachments;
        })
      ).subscribe()
    }
    // window.location.reload();
    this.closeEditModal();
    this.showResponseModal();
    // this.loadData();
    form.reset();
  }

  getIdDelete(i: number) {
    this.deleteId = this.eHealthBookDetail[i].id;
  }

  onDelete() {
    this.eHealthBookDetailService.delete(this.deleteId).subscribe((res) => {
      this.responseMessage = res.message;
      console.log(this.responseMessage)
      this.closeDeleteModal();
      this.showResponseModal();
      // this.loadData();
    });
  }

  getListAttachment(i: number) {
    this.listAttachmentDownload = [];
    this.listAttachmentDownload = this.eHealthBookDetail[i].attachments;
  }

  downloadAttachment(url: string, name: string) {
    this.attachmentService.download(url, name);
  }

  removeAttachment(i: number) {
    this.listAttachmentDownload.splice(i, 1);
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

  viewAttachment(url: string) {
    // console.log(url)
    window.open(url);
  }

  reloadPage() {
    window.location.reload();
  }

}
