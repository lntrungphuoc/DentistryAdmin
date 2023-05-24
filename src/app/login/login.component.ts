import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../entities/authenticatedResponse';
import { LoginRequest } from '../entities/loginRequest';
import { UserService } from '../services/userService';
import jwt_decode from "jwt-decode"
import { User } from '../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  credentials: LoginRequest = { username: '', password: '' };

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  login(form) {
    if (form.valid) {
      this.credentials.username = form.value.name
      this.credentials.password = form.value.password
      this.userService.login(this.credentials).subscribe({
        next: async (response: AuthenticatedResponse) => {
          localStorage.removeItem("jwt");
          localStorage.removeItem("userName");
          const token = response.token;
          localStorage.setItem("jwt", token);
          var userName = atob(token.split('.')[1]).split(',')[1].split(':')[2].replace('"', "").replace('"', "");
          console.log(atob(token.split('.')[1]).split(',')[1].split(':')[2].replace('"', "").replace('"', ""))
          await this.userService.getLoggedInfo(userName).then(
            (res) => {
              var user = res;
              localStorage.setItem("userName", user.fullName);
            }
          );
          this.invalidLogin = false;
          this.router.navigateByUrl("");
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }

}
