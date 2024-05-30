import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotFrom!: FormGroup;
  email: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgotFrom = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
      ]]
    });
  }

  async onSubmit() {
    
    if (this.forgotFrom.invalid || this.loading) {
      return;
    }

    this.loading = true;
    console.log(this.forgotFrom.value.email);
    const email = this.forgotFrom.value.email;

    try {
      const res = await firstValueFrom(
        this.userService.sendOtp(email).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 404) {
                this.toaster.error("Invalid email");
                this.loading = false;
                return of(null); // Prevent further error handling
              } else {
                this.toaster.error("Error occurred while sending OTP!");
                this.loading = false;
                return throwError(error);
              }
            } else {
              this.toaster.error("An unexpected error occurred!");
              this.loading = false;
              return throwError(error);
            }
          })
        )
      );

      if (res && res.message === 'OTP has been sent to your email') {
        console.log(res);
        this.router.navigate(['otp-validation'], { queryParams: { email } });
        this.toaster.info("OTP has been sent to your email");
      }
    } catch (err) {
      console.log("Error occurred", err);
    } finally {
      this.loading = false;
    }
  }
}
