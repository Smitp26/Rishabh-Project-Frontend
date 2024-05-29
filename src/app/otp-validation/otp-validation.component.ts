import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OTPValidationComponent implements OnInit, OnDestroy {

  verifyOtpForm!: FormGroup;
  email!: string;
  minutes: number = 5;
  seconds: number = 0;
  timeUp: boolean = false;
  private timerSubscription!: Subscription;
  hideOtp = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  toggleVisibility(): void {
    this.hideOtp = !this.hideOtp;
  }

  async onSubmit() {
    if (this.verifyOtpForm.invalid) {
      return;
    }

    const otp = this.verifyOtpForm.value['otp'];
    try {
      if (!this.timeUp) {
        const res = await this.userService.verifyOtp(this.email, otp).toPromise();
        if (res && res.message === 'OTP has been verified, Proceed to reset password!') {
          this.router.navigate(['newpassword'], { queryParams: { email: this.email, otp } });
          this.toaster.success("OTP verified Successfully", 'Success');
        } else {
          this.toaster.error('Invalid OTP or error occurred!', 'Error');
        }
      }
    } catch (err) {
      console.log("Error occurred", err);
      this.toaster.error('Invalid OTP or error occurred!', 'Error');
    }
  }

  get f() {
    return this.verifyOtpForm.controls;
  }

  startTimer() {
    const timer$ = interval(1000).pipe(take(300));

    this.timerSubscription = timer$.subscribe((elapsed: number) => {

      const totalSeconds = 300 - elapsed;
      this.minutes = Math.floor(totalSeconds / 60);
      this.seconds = totalSeconds % 60;
      
      if (totalSeconds === 0) {
        this.timeUp = true;
        this.timerSubscription.unsubscribe();
      }
    });
  }
}
