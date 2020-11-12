import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  
  globalUser: User = new User();
  isLogedIn = { state: false };

  constructor() {}

  login(
    { name, password }: User
  ): void {
    localStorage.setItem("userName",name);
    this.isLogedIn.state = true;
    this.globalUser.name = name;
    this.globalUser.password = password;
  }

  logout():void{
    localStorage.clear();
    this.isLogedIn.state = false;
    this.globalUser.name = '';
  }

  edit(newUsername: string,newUserPassword:string): void {
    localStorage.setItem("userName",newUsername);
    this.globalUser.name = newUsername;
    this.globalUser.password = newUserPassword;
  }
}
