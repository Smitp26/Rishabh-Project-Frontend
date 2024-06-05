import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OTPValidationComponent } from './otp-validation/otp-validation.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { authGuard } from './services/auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CancelbookingComponent } from './cancelbooking/cancelbooking.component';
import { CouponComponent } from './coupon/coupon.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {path:'',component:LoginComponent}
  ,{path:'login',component:LoginComponent}
  ,{path:'forgot-password',component:ForgotPasswordComponent}
  ,{path:'otp-validation',component:OTPValidationComponent}
  ,{path:'dashboard',component:DashboardComponent, canActivate:[authGuard]}
  ,{path:'singup',component:SingupComponent}
  ,{path:'newpassword',component:NewpasswordComponent}
  ,{path:'changepassword',component:ChangepasswordComponent}
  ,{path: 'cancelbooking', component: CancelbookingComponent }
  ,{path :'coupon',component:CouponComponent}
  ,{path:'Privaypolicy',component:PrivacyPolicyComponent}
  ,{path:'terms',component:TermsComponent}
  ,{path:'aboutus',component:AboutusComponent}
  ,{path:'booking',component:BookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
