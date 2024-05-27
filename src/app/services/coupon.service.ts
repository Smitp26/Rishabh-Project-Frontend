import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl = 'http://localhost:8081/coupons';

  constructor(private http: HttpClient) { }

  // generateCoupon(email: string): Observable<any> {
  //   let id = localStorage.getItem("email");
  //   return this.http.post<any>(`${this.baseUrl}/generate?employeeId=${email}`, {});
  // }

  generateCoupon(employeeId: number): Observable<any> {
    console.log(employeeId);
    return this.http.post<any>(`${this.baseUrl}/generate?employeeId=${employeeId}`, {});
  }

  validateCoupon(couponId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/validate`, couponId, { headers, responseType: 'text' });
  }
}
