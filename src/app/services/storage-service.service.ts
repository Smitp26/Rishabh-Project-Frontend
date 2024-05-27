import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  static saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static saveUser(user: any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }
  
  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER)!);
  }
  

  static getToken(): string{
    return localStorage.getItem(TOKEN)!;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){return '';}
    return user.role;
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken() === null){return false;}

    const role: string = this.getUserRole();
    return role == "CUSTOMER";
  }

  static signout(){
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
  }
}
