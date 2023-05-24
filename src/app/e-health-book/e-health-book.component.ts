import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from '../entities/clinic';
import { Customer } from '../entities/customer';
import { EHealthBook } from '../entities/eHealthBook';
import { Service } from '../entities/service';
import { ClinicService } from '../services/clinicService';
import { CustomerService } from '../services/customerService';
import { EHealthBookService as EHealthBookServices } from '../services/eHealthBookService';
import { ServiceService } from '../services/serviceService';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EHealthBookServiceService } from '../services/eHealthBookServiceService';
import { EHealthBookService } from '../entities/eHealthBookService';
import { Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-e-health-book',
  templateUrl: './e-health-book.component.html',
  styleUrls: ['./e-health-book.component.css']
})
export class EHealthBookComponent implements OnInit {
  eHealthBookUpdate: EHealthBook = new EHealthBook();
  eHealthBook: EHealthBook = new EHealthBook();
  eHealthBooks: EHealthBook[];
  id: number;
  deleteId: number;
  clinics: Clinic[];
  customers: Customer[];
  services: Service[];
  selectedServices: Service[];
  currentSelectedServices: Service[] = [];
  fee;
  updateFee;
  responseMessage: string = '';
  printInfo: EHealthBook= new EHealthBook();
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

  constructor(private eHealthBookService: EHealthBookServices,
    private router: Router,
    private clinicService: ClinicService,
    private customerService: CustomerService,
    private serviceService: ServiceService,
    private eHealthBookServiceService: EHealthBookServiceService) { }

  ngOnInit(): void {
    this.eHealthBookService.getAll().subscribe((res) => {
      this.eHealthBooks = res;
      if (this.eHealthBooks.length > 0) {
        this.printInfo = this.eHealthBooks[0];
      }
      $(function () {
        $("#health-book-table").DataTable();
      });
      this.dtTrigger.next();
    });
    this.clinicService.getAll().subscribe((res) => this.clinics = res);
    this.customerService.getAll().subscribe((res) => this.customers = res);
    this.serviceService.getAll().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => console.log(error)
    );
    this.selectedServices = [];
  }

  loadData() {
    this.eHealthBookService.getAll().subscribe((res) => {
      this.eHealthBooks = res;
      console.log(this.eHealthBooks)
    });
    // this.clinicService.getAll().subscribe((res) => this.clinics = res);
    // this.customerService.getAll().subscribe((res) => this.customers = res);
    // this.serviceService.getAll().subscribe(
    //   (data) => {
    //     this.services = data;
    //   },
    //   (error) => console.log(error)
    // );
    this.selectedServices = []
  }

  getUpdateInfo(i: number) {
    this.eHealthBookUpdate.id = this.eHealthBooks[i].id;
    this.eHealthBookUpdate.idClinic = this.eHealthBooks[i].idClinic;
    this.eHealthBookUpdate.idCustomer = this.eHealthBooks[i].idCustomer;
    this.eHealthBookUpdate.totalFee = this.eHealthBooks[i].totalFee;
    this.eHealthBookUpdate.checkUpDate = this.eHealthBooks[i].checkUpDate;
    this.eHealthBookUpdate.reExaminationDate = this.eHealthBooks[i].reExaminationDate;
    this.eHealthBookUpdate.note = this.eHealthBooks[i].note;
    this.eHealthBookUpdate.createdDate = this.eHealthBooks[i].createdDate;
    this.eHealthBookUpdate.createdBy = this.eHealthBooks[i].createdBy;
    this.selectedServices = []
    this.selectedServices.push(...this.eHealthBooks[i].eHealthBookServices.map(rs => rs.service));
    this.updateFee = this.eHealthBooks[i].totalFee;
  }

  async onUpdate() {
    this.eHealthBookUpdate.totalFee = this.updateFee;
    await this.eHealthBookService.update(this.eHealthBookUpdate).then(res => {
      this.responseMessage = res.message;
    });
    await this.eHealthBookServiceService.deleteRange(this.eHealthBookUpdate.id).then(res => console.log(res));

    if (this.selectedServices.length > 0) {
      of(this.selectedServices).pipe(
        switchMap((serivces) => {
          serivces.map(async (service) => {
            const createEHealthBookService: EHealthBookService = new EHealthBookService();
            createEHealthBookService.idEHealthBook = this.eHealthBookUpdate.id;
            createEHealthBookService.idService = service.id;
            await this.eHealthBookServiceService.create(createEHealthBookService)
          })
          return serivces;
        })
      ).subscribe(() => {
        this.closeEditModal();
        this.showResponseModal();
        // this.loadData();
      })
    }
  }

  eHealthBookDetail(i: number) {
    this.id = this.eHealthBooks[i].id;
    this.router.navigateByUrl("chi-tiet-so-suc-khoe/" + this.id);
  }

  async onCreate(form) {
    var data = form.value;
    this.eHealthBook.idClinic = data.clinic;
    this.eHealthBook.idCustomer = data.customer;
    this.eHealthBook.totalFee = data.totalFee;
    this.eHealthBook.checkUpDate = data.date;
    let listService: Service[] = data.service;
    this.eHealthBook.totalFee = this.fee;
    if (data.reExaminationDate == '') {
      data.reExaminationDate = null;
    }
    
    if (data.note == '') {
      data.note = null;
    }
    
    this.eHealthBook.reExaminationDate = data.reExaminationDate;
    this.eHealthBook.note = data.note;
    let newEHealthBook;

    await this.eHealthBookService.createPromise(this.eHealthBook).then((res) => {
      newEHealthBook = res.data[0];
      this.responseMessage = res.message;
    });

    if (listService.length > 0) {
      of(listService).pipe(
        switchMap((services) => {
          services.map(async service => {
            const createEHealthBookService: EHealthBookService = new EHealthBookService();
            createEHealthBookService.idEHealthBook = newEHealthBook.id;
            createEHealthBookService.idService = service.id;
            await this.eHealthBookServiceService.create(createEHealthBookService);
          })
          return services;
        })
      ).subscribe(() => {
        this.closeAddModal();
        this.showResponseModal();
        form.reset();
        // this.loadData();
      });
    }
  }

  getIdDelete(i: number) {
    this.deleteId = this.eHealthBooks[i].id;
  }

  onDelete() {
    this.eHealthBookService.delete(this.deleteId).subscribe((res) => {
      this.responseMessage = res.message;
      this.closeDeleteModal();
      this.showResponseModal();
      // this.loadData();
    });
  }

  calculateFee() {
    this.serviceService.calculateFee(this.currentSelectedServices).subscribe(res => {
      this.fee = res;
    });
  }

  onItemSelect(item: any) {
    this.currentSelectedServices.push(item);
    this.fee = 0;
    this.currentSelectedServices.forEach((selectedService) => {
      this.services.forEach((service) => {
        if (selectedService.id == service.id) {
          this.fee = service.fee + this.fee;
        }
      })
    })
  }

  onSelectAll(items: any) {
    this.onDeSelectAll();
    this.currentSelectedServices.push(...items);
    this.services.forEach((serivce) => {
      this.fee = serivce.fee + this.fee;
    })
  }

  onDeSelect(item: any) {
    this.currentSelectedServices.forEach((service, index) => {
      if (service.id == item.id)
        this.currentSelectedServices.splice(index, 1);
    })
    this.services.forEach((service) => {
      if (service.id == item.id)
        this.fee = this.fee - service.fee
    })
  }

  onDeSelectAll() {
    this.currentSelectedServices = [];
    this.fee = 0;
  }

  calculateFeeUpdate() {
    this.serviceService.calculateFee(this.selectedServices).subscribe(res => {
      this.updateFee = res;
    });
  }

  onItemSelectUpdate(item: any) {
    this.updateFee = 0;
    this.selectedServices.forEach((selectedService) => {
      this.services.forEach((service) => {
        if (service.id == selectedService.id) {
          this.updateFee = this.updateFee + service.fee;
        }
      })
    })
  }

  onSelectAllUpdate(items: any) {
    this.updateFee = 0;
    this.services.forEach((serivce) => {
      this.updateFee = serivce.fee + this.updateFee;
    })
  }

  onDeSelectUpdate(item: any) {
    this.services.forEach((service) => {
      if (service.id == item.id)
        this.updateFee = this.updateFee - service.fee
    })
  }

  onDeSelectAllUpdate() {
    this.updateFee = 0;
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

  getPrintInfo(i) {
    this.printInfo = new EHealthBook();
    this.printInfo.id = this.eHealthBooks[i].id;
    this.printInfo.clinic = this.eHealthBooks[i].clinic;
    this.printInfo.customer = this.eHealthBooks[i].customer;
    this.printInfo.idClinic = this.eHealthBooks[i].idClinic;
    this.printInfo.idCustomer = this.eHealthBooks[i].idCustomer;
    this.printInfo.totalFee = this.eHealthBooks[i].totalFee;
    this.printInfo.checkUpDate = this.eHealthBooks[i].checkUpDate;
    this.printInfo.createdDate = this.eHealthBooks[i].createdDate;
    this.printInfo.createdBy = this.eHealthBooks[i].createdBy;
    this.selectedServices = []
    this.selectedServices.push(...this.eHealthBooks[i].eHealthBookServices.map(rs => rs.service));
    this.printInfo.totalFee = this.eHealthBooks[i].totalFee;
    console.log(this.printInfo)
  }

  printInvoice() {
    window.print()
  }

  reloadPage() {
    window.location.reload();
  }

}
