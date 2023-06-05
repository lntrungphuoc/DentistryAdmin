import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/userService';
import { RoleService } from '../services/roleService';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { DataTableDirective } from 'angular-datatables';
import { Subject, of } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  listUser: User[];
  listRole: Role[];
  userUpdate: User = new User();
  responseMessage: string = '';
  @ViewChild('closeAddButton') closeAddButton;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private userService: UserService,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((res) => {
      this.listUser = res;
      console.log(this.listUser);
      $(function () {
        $("#user-table").DataTable();
      });
      this.dtTrigger.next();
    });

    this.roleService.getAll().subscribe((res) => {
      this.listRole = res;
      console.log(this.listRole);
    });
  }

  onSubmit(form) {
    var data = form.value;
    var newUser: User = new User;
    newUser.userName = data.userName;
    newUser.fullName = data.fullName;
    newUser.email = data.email;
    newUser.phoneNumber = data.phoneNumber;
    newUser.password = data.phoneNumber;
    var roles = data.role;
    var listRoleString: String[] = [];
    newUser.roles = listRoleString;

    roles.forEach(role => {
      newUser.roles.push(role.name)
    });

    // if (roles.length > 0) {
    //   of(roles).pipe(
    //     switchMap((arrRole) => {
    //       arrRole.map(role => {
    //         listRoleString.push(role.name)
    //         console.log(role.name)
    //       })
    //       return arrRole;
    //     })
    //   )
    // }
    // console.log(newUser)
    this.userService.create(newUser).subscribe((res) => {
      console.log(res)
      this.responseMessage = res.message;
      this.closeAddModal();
      this.showResponseModal();
      form.reset();
      console.log('xong')
    })
  }

  getUpdateInfo(i: number) {
    this.userUpdate.id = this.listUser[i].id;
    this.userUpdate.userName = this.listUser[i].userName;
    this.userUpdate.fullName = this.listUser[i].fullName;
    this.userUpdate.email = this.listUser[i].email;
    this.userUpdate.phoneNumber = this.listUser[i].phoneNumber;
    this.userUpdate.password = this.listUser[i].password;
  }

  onUpdate() {

  }

  reloadPage() {
    window.location.reload();
  }

  onDelete() {

  }

  onItemSelect(item: any) {

  }

  onSelectAll(items: any) {

  }

  onDeSelect(item: any) {

  }

  onDeSelectAll() {

  }

  closeAddModal() {
    this.closeAddButton.nativeElement.click();
  }

  showResponseModal() {
    document.getElementById("openModalButton").click();
  }
}
