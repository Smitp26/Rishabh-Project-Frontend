import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  name: string = '';
  userId: number | undefined;
  currentDate: string = '';
  currentDay: string = '';
  couponCode: string = '';
  redeemed: boolean = false;
  validity: number | undefined;
  error: string | undefined;
  isRedeemButtonDisabled: boolean = false; 
  showCoupon: boolean = false;
  remainingTime: number = 0;

  constructor(
    private couponService: CouponService,
    private authService: AuthService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name") ?? '';
    this.userId = this.authService.getLoggedInUserId();
    this.currentDate = new Date().toLocaleDateString();
    this.currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  }

  redeemCoupon(): void {
    if (this.userId) {
      console.log('Generating coupon for user ID:', this.userId);
      this.couponService.generateCoupon(this.userId).subscribe(
        response => {
          this.couponCode = response.couponId;
          this.validity = response.validity;
          this.redeemed = true;
          this.error = undefined; 
          this.isRedeemButtonDisabled = true; 
          this.showCoupon = true;
          
          // Start the countdown timer for 10 seconds
          this.startCountdown(20);

          // Timer for disabling the redeem button for 10 seconds
          timer(10000).pipe(take(1)).subscribe(() => {
            this.isRedeemButtonDisabled = false; 
          });

          this.toaster.success("Coupon generated successfully", "Success");
        },
        error => {
          if (error.error && error.error.message) {
            if (error.error.message === "Coupon has already been generated for this booking") {
              this.toaster.error("Coupon has already been generated for this booking", 'Error');
            } else if (error.error.message === "Booking not found") {
              this.toaster.error("Booking not found", 'Error');
            } else {
              this.toaster.error(error.error.message, 'Error');
            }
          } else {
            this.toaster.error("Coupon has already been generated for this booking", 'Error');
          }
        }
      );
    } else {
      console.error('User ID not found');
      this.error = 'User ID not found';
    }
  }

  startCountdown(seconds: number): void {
    this.remainingTime = seconds;
    const countdownTimer = timer(0, 1000).pipe(take(seconds + 1));
    countdownTimer.subscribe(
      () => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          this.showCoupon = false;
          this.redeemed = false;
        }
      },
      null,
      () => {
        this.showCoupon = false;
        this.redeemed = false;
      }
    );
  }

  validateCoupon(): void {
    if (this.couponCode) {
      this.couponService.validateCoupon(this.couponCode).subscribe(
        response => {
          console.log('Coupon validation successful:', response);
          this.toaster.success('Coupon is valid', 'Success');
          this.error = undefined; // Clear any previous errors
        },
        error => {
          console.error('Coupon validation failed:', error);
          if (error.error && error.error.message) {
            if (error.error.message === "Coupon is expired") {
              this.toaster.error("Coupon is expired", 'Error');
            } else if (error.error.message === "Coupon not found") {
              this.toaster.error("Coupon not found", 'Error');
            } else {
              this.toaster.error(error.error.message, 'Error');
            }
          } else {
            this.toaster.error('Coupon validation failed', 'Error');
          }
        }
      );
    } else {
      console.error('Coupon code not found');
      this.error = 'Coupon code not found';
    }
  }
}
