import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass']
})
export class InfoComponent {

  constructor(private myAccountService:AccountService,private route:Router) {}

  get username():string{
    if (this.myAccountService.globalUser.name == undefined) {
      if (localStorage.getItem(localStorage.key(0)) != undefined) {
        return localStorage.getItem(localStorage.key(0));
      }else{
        return 'Guest';
      }
      
    }else{
      return this.myAccountService.globalUser.name;
    }
  }

  routeToEdit(){
    this.route.navigate(["account/edit"]);
  }

  reouteToPosts(){
    this.route.navigate(["../posts"]);
  }

  reouteToSeePosts(){
    this.route.navigate(["../seeAllPosts"])
  }
}
