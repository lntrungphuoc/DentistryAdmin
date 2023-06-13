import { Component, ViewChild } from '@angular/core';
import { Service } from '../entities/service';
import { ServiceService } from '../services/serviceService';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as CKEditor from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-our-service',
  templateUrl: './our-service.component.html',
  styleUrls: ['./our-service.component.css']
})
export class OurServiceComponent {
  listService: Service[];
  serviceUpdate: Service = new Service();
  serviceCreate: Service = new Service();
  deleteId: number = 0;
  responseMessage: string = '';
  public Editor = CKEditor;
  ckeConfig: any;

  @ViewChild('closeAddButton') closeAddButton;
  @ViewChild('closeEditButton') closeEditButton;
  @ViewChild('closeDeleteButton') closeDeleteButton;
  @ViewChild('closeConfirmButton') closeConfirmButton;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private serviceSerivce: ServiceService) {}

  ngOnInit(): void {
    this.serviceSerivce.getAll().subscribe((res) => {
      this.listService = res;
      console.log(this.listService)
      $(function () {
        $("#service-table").DataTable();
      });
      this.dtTrigger.next();
    })

    this.ckeConfig = {
      uiColor: '#f4f9fc',
      extraPlugins: 'uploadimage',
      uploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images'
    };
  }

  getUpdateInfo(i: number) {
    this.serviceUpdate.id = this.listService[i].id;
    this.serviceUpdate.name = this.listService[i].name;
    this.serviceUpdate.information = this.listService[i].information;
    this.serviceUpdate.fee = this.listService[i].fee;
    this.serviceUpdate.createdDate = this.listService[i].createdDate;
    this.serviceUpdate.createdBy = this.listService[i].createdBy;
    this.serviceUpdate.modifiedBy = this.listService[i].modifiedBy;
    this.serviceUpdate.modifiedDate = this.listService[i].modifiedDate;
    this.serviceUpdate.url = this.listService[i].url;
  }

  getIdDelete(i: number) {
    this.deleteId = this.listService[i].id;
  }

  onUpdate() {
    this.serviceSerivce.update(this.serviceUpdate).subscribe(res => {
      this.closeEditModal();
      this.responseMessage = res.message;
      this.showResponseModal();
    })
  }

  onSubmit(form) {
    var data = form.value;
    this.serviceCreate.name = data.name;
    this.serviceCreate.information = data.information;
    this.serviceCreate.fee = data.fee;
    if (data.url == "") {
      this.serviceCreate.url = null;
    } else {
      this.serviceCreate.url = data.url;
    }
    console.log(this.serviceCreate)
    this.serviceSerivce.create(this.serviceCreate).subscribe(res => {
      this.responseMessage = res.message;
      this.closeAddModal();
      this.showResponseModal();
    })
  }

  onDelete() {
    this.serviceSerivce.delete(this.deleteId).subscribe((res) => {
        this.closeDeleteModal();
        this.responseMessage = res.message;
        this.showResponseModal();
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
