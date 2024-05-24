import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = false;

  isAuthenticated(): boolean{
    return this.loggedIn;
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  // constructor(private router: Router) { }

  // public isAuthenticated(): boolean{
  //   const token = localStorage.getItem('token');

  //   if(!token){
  //     this.router.navigate(['/']);
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }
}
