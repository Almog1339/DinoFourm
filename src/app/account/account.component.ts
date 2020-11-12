import { Component } from '@angular/core';
import { AccountService } from '../shared/services/account.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent {
  constructor(public myAccountService: AccountService, private myRouter:Router) { }

  logOutUser(): void {
    this.myAccountService.logout();
    this.myRouter.navigateByUrl("/account/login");
  }

  get user():User{
    return this.myAccountService.globalUser;
  }

  get isLogedIn(){
    return this.myAccountService.isLogedIn;
  }

}
