import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OTPValidationComponent } from './otp-validation/otp-validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QRCodeModule } from 'angularx-qrcode';
import { BookingComponent } from './booking/booking.component';
import { CouponComponent } from './coupon/coupon.component';
import { CancelbookingComponent } from './cancelbooking/cancelbooking.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { QuickBookingComponent } from './quickbooking/quickbooking.component';
import { TermsComponent } from './terms/terms.component';
import { ViewBookingComponent } from './viewbooking/viewbooking.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingupComponent } from './singup/singup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    OTPValidationComponent,
    NewpasswordComponent,
    BookingComponent,
    CouponComponent,
    CancelbookingComponent,
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    ViewBookingComponent,
    AboutusComponent,
    ChangepasswordComponent,
    QuickBookingComponent,
    DashboardComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass:'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    NgxUiLoaderModule,
    NgbNavModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule,
    NgbModule,
    QRCodeModule,
    MatMenuModule,
    FullCalendarModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
