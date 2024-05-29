import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn = false;
  loggedInEmployee: any = null;
  email: any = '';
  employeeId!: number;


  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.loggedInEmployee = null;
  }

  login(employee: any): Observable<any> {
    this.loggedInEmployee = true;
    this.loggedInEmployee = employee;
        return this.http.post<any>('http://localhost:8081/api/auth/login', employee).pipe(
      tap(response => {
        this.isLoggedIn = true;
        this.loggedInEmployee = response;
        
        // this.employeeId = response.id;
        // this.email = response.email;

        localStorage.setItem('employeeId', response.id);
        window.localStorage.setItem("id", String(this.employeeId));
        window.localStorage.setItem("email", this.email);
      })
    );
  }

  saveUserData(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLoggedInEmployee(): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/api/employee/${this.employeeId}`);
  }

  public isAuthenticated(): boolean{
    
    const token = localStorage.getItem('token');

    if(!token){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }
}
