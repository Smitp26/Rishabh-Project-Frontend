import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
    localStorage.clear();
    console.log("Inside Logout");
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

        //localStorage.setItem('employeeId', response.id);
        window.localStorage.setItem("id", String(this.employeeId));
        window.localStorage.setItem("email", this.email);

        this.getLoggedInEmployee().subscribe((loggedInEmployee) => {
          localStorage.setItem("name", loggedInEmployee.name);
        });
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
      this.router.navigate(['/login']);
      return false;
    }
    else{
      return true;
    }
  }

  getLoggedInUserId(): number {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    return user && user.id ? Number(user.id) : 0; // Assuming 0 indicates "User Not Exist"
  }

  getLoggedInUserName(): string {
    const userJson = localStorage.getItem('USER'); // Update key to 'USER'
    const user = userJson ? JSON.parse(userJson) : null;
    return user && user.name ? user.name : 'Unknown';
  }
}
