import { async } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  urlLichHen: string = "lich-hen";
  urlSoSucKhoe: string = "so-suc-khoe";
  urlChiTiet: string = "chi-tiet-so-suc-khoe"
  urlKhachHang: string = "khach-hang";
  urlDangNhap: string = "dang-nhap";
  urlDaXacNhan: string = "da-xac-nhan";
  urlChuaXacNhan: string = "chua-xac-nhan";
  urlDichVu: string = "service";
  urlUser: string = "user";
  fullName: string;
  user: User;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onClick(url: string) {
    this.router.navigateByUrl(url);
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
  }

  async getUserName() {
    var userName = atob(localStorage.getItem("jwt").split('.')[1]).split(',')[0].split(':')[2].replace('"', "").replace('"', "");
    await this.userService.getLoggedInfo(userName).then(
      (res) => {
        this.user = res;
        this.fullName = this.user.fullName;
      }
    );
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.fullName = localStorage.getItem("userName");
      return true;
    }
    return false;
  }

}
