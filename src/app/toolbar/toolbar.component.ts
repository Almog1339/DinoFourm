import { Component } from '@angular/core';
import { AccountService } from '../shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {

  constructor(private myAccountService:AccountService,private router: Router) { }

  get userInfo():string{
    if (this.myAccountService.globalUser.name != undefined) {
      this.isLogedIn.state = true;
      return this.myAccountService.globalUser.name;  
    }else if (localStorage.getItem(localStorage.key(0)) != undefined){
      this.isLogedIn.state = true;
      this.myAccountService.globalUser.name = localStorage.getItem(localStorage.key(0));
      return localStorage.getItem(localStorage.key(0));
    }
    
  }
  
  get isLogedIn(){
    return this.myAccountService.isLogedIn;
  }

  redirectToLogin():void{
    this.router.navigate(['account/login']);
  }
}
