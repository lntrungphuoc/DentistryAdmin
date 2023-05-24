import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentSchedule } from './entities/appointmentSchedule';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';
import { EHealthBookComponent } from './e-health-book/e-health-book.component';
import { EHealthBookDetailComponent } from './e-health-book-detail/e-health-book-detail.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ConfirmedAppointmentComponent } from './confirmed-appointment/confirmed-appointment.component';
import { NotConfirmedAppointmentComponent } from './not-confirmed-appointment/not-confirmed-appointment.component';
import { ErrorCatchingInterceptorService } from './services/error-catching-interceptor.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'lich-hen', component: AppointmentScheduleComponent, canActivate: [AuthGuard] },
  { path: 'so-suc-khoe', component: EHealthBookComponent, canActivate: [AuthGuard] },
  { path: 'chi-tiet-so-suc-khoe/:id', component: EHealthBookDetailComponent, canActivate: [AuthGuard] },
  { path: 'khach-hang', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'da-xac-nhan', component: ConfirmedAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'chua-xac-nhan', component: NotConfirmedAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'dang-nhap', component: LoginComponent },
  { path: '', component: HomeComponent }
]

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftSidebarComponent,
    AppointmentScheduleComponent,
    EHealthBookComponent,
    EHealthBookDetailComponent,
    CustomerComponent,
    LoginComponent,
    ConfirmedAppointmentComponent,
    NotConfirmedAppointmentComponent,
    HomeComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
