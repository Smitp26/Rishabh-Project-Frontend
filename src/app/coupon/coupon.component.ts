import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { AuthService } from '../services/auth.service';

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

  constructor(private couponService: CouponService, private authService: AuthService) {}

  ngOnInit(): void {
    this.name = this.authService.getLoggedInUserName();
    this.userId = this.authService.getLoggedInUserId();
    this.currentDate = new Date().toLocaleDateString();
    this.currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  }
  redeemCoupon(): void {
    if (this.userId) {
      console.log('Generating coupon for user ID:', this.userId); // Log userId
      this.couponService.generateCoupon(this.userId).subscribe(
        response => {
          this.couponCode = response.couponId;
          this.validity = response.validity;
          this.redeemed = true;
        },
        error => {
          console.error('Failed to generate coupon:', error);
          // Handle error
        }
      );
    } else {
      console.error('User ID not found');
      // Handle error
    }
  }
  
}