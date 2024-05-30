import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CouponService } from '../services/coupon.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  qrCodeValue: string = '';
  couponCode: string = '';
  email!: string;
  showQrCode: boolean = false;
  employeeId!: number;
  showScanner: boolean = false;

  constructor(private couponService: CouponService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Retrieve user from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this.employeeId = userObj.id;
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  

  getLoggedInEmployee() {
    this.authService.getLoggedInEmployee().subscribe({
      next: (employee) => {
        console.log(employee);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  generateQRCode(): void {
    if (this.employeeId) {
      this.couponService.generateCoupon(this.employeeId).subscribe({
        next: (response) => {
          this.couponCode = response.couponId;
          this.qrCodeValue = this.couponCode;
          this.showQrCode = true;

          console.log(this.couponCode);

          // Hide QR code after one minute
          timer(60000).subscribe(() => {
            this.showQrCode = false;
          });
        },
        error: (error) => {
          console.error('Failed to generate coupon', error);
        },
        complete: () => {
          console.log('Coupon generation process completed.');
        }
      });
    } else {
      console.error('Invalid Id');
    }
  }
  
  
}
