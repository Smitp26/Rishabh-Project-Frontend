// import { Injectable } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http'; 
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CouponService {

//   private baseUrl = 'http://localhost:8081/coupons';

//   constructor(private http: HttpClient) { }

//   generateCoupon(employeeId: number): Observable<any> {
//     console.log(employeeId);
//     return this.http.post<any>(`${this.baseUrl}/generate?employeeId=${employeeId}`, {});
//   }

//   validateCoupon(couponId: string): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post(`${this.baseUrl}/validate`, couponId, { headers, responseType: 'text' });
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

 private baseUrl = 'http://localhost:8081/coupons';

  generateCouponForAuthenticatedUser() {
    throw new Error('Method not implemented.');
  }
  
  constructor(private http: HttpClient) { }


  generateCoupon(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generate` ,null, {
      params: { id: userId.toString() }
    });
  }
  validateCoupon(couponId: string): Observable<any> {
    return this.http.post<any>('http://localhost:8081/coupons/validate', { couponId });
  }
}
