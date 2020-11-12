import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from '../shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(
    private myAccountService: AccountService,
    private fb: FormBuilder,
    private myRouter: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', ''],

      userPassword: ['', ''],
    });
  }

  saveInfo() {
    this.myAccountService.login({name:this.loginForm.value.userName,password:this.loginForm.value.userPassword});
    this.loginForm.reset;
    this.myRouter.navigateByUrl("account/info")
  }
}
