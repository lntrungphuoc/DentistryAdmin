import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../entities/customer';
import { CustomerService } from '../services/customerService';
import { error } from 'console';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  customerUpdate: Customer = new Customer();
  customerCreate: Customer = new Customer();
  deleteId: number;
  responseMessage: string = '';
  password: string = '';
  confirmPassword: string = '';
  @ViewChild('closeAddButton') closeAddButton;
  @ViewChild('closeEditButton') closeEditButton;
  @ViewChild('closeDeleteButton') closeDeleteButton;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private customerService: CustomerService, private route: Router) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe((res) => {
      this.customers = res;
      $(function () {
        $("#customer-table").DataTable();
      });
      this.dtTrigger.next();
    });
  }

  onSubmit(form) {
    var data = form.value
    this.customerCreate.customerName = data.name;
    this.customerCreate.address = data.address;
    this.customerCreate.phoneNumber = data.phoneNumber;
    this.customerCreate.password = data.phoneNumber;
    // this.customerCreate.cccd = data.cccd;
    this.customerCreate.bhyt = data.bhyt;
    // console.log(data)
    this.customerService.create(this.customerCreate).subscribe((res) => {
      this.responseMessage = res.message;
      this.closeAddModal();
      this.showResponseModal();
      this.password = '';
      this.confirmPassword = '';
      // this.loadData();
    });
    form.reset();
  }

  checkConfirmPassword(): boolean {
    if (this.confirmPassword != this.password)
      return false;
    return true;
  }

  loadData() {
    this.customerService.getAll().subscribe((res) => {
      this.customers = res;
    });
  }

  getUpdateInfo(i: number) {
    this.customerUpdate.id = this.customers[i].id;
    this.customerUpdate.customerName = this.customers[i].customerName;
    this.customerUpdate.address = this.customers[i].address;
    this.customerUpdate.phoneNumber = this.customers[i].phoneNumber;
    this.customerUpdate.password = this.customers[i].password;
    // this.customerUpdate.cccd = this.customers[i].cccd;
    this.customerUpdate.bhyt = this.customers[i].bhyt;
    this.customerUpdate.createdDate = this.customers[i].createdDate;
    this.customerUpdate.createdBy = this.customers[i].createdBy;
    this.password = this.customers[i].password;
    this.confirmPassword = this.customers[i].password;
  }

  onUpdate() {
    this.customerUpdate.password = this.password;
    this.customerService.update(this.customerUpdate).subscribe((res) => {
      this.responseMessage = res.message;
      this.closeEditModal();
      this.showResponseModal();
      // this.loadData();
    });
  }

  getIdDelete(i: number) {
    this.deleteId = this.customers[i].id;
  }

  onDelete() {
    this.customerService.delete(this.deleteId).subscribe((res) => {
      this.responseMessage = res.message;
      this.closeDeleteModal();
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

  reloadPage() {
    window.location.reload();
  }

}
