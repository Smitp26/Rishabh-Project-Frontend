import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  getBookingForUserAndDate(loggedInUserId: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8081/api/bookings';
  private canceledBookings: Set<string> = new Set();

  constructor(private http: HttpClient) { }

  public bookMeal(bookingDetails: any, isBulk: boolean): Observable<any> {
    const endpoint = isBulk ? `${this.baseUrl}/bulk` : `${this.baseUrl}/single`;
    return this.http.post<any>(endpoint, bookingDetails);
  }

  public quickBookMeal(userId: number, mealType: string): Observable<any> {
    const endpoint = `${this.baseUrl}/quickBook`;
    const body = { userId, mealType };
    return this.http.post<any>(endpoint, body);
  }

  public getBookingDates(userId: number): Observable<string[]> {
    const endpoint = `${this.baseUrl}/dates/${userId}`;
    return this.http.get<string[]>(endpoint);
  }

  public cancelBooking(cancellationDate: string): Observable<string> {
    const endpoint = `${this.baseUrl}/cancel?cancellationDate=${cancellationDate}`;
    return this.http.post<string>(endpoint, null);
  }

  public isBookingCancelled(date: string): boolean {
    return this.canceledBookings.has(date);
  }
}