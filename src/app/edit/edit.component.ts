import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from '../shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent  {
  editForm: FormGroup;
  
  constructor(private myAccountService: AccountService,private fb: FormBuilder, private myRouter:Router) {
    this.createForm();
    
  }

  createForm() {
    this.editForm = this.fb.group({
      userName: ['', ''],
      userPassword: ['','']
    });
  }

  editUser() {
    this.myAccountService.edit(this.editForm.value.userName,this.editForm.value.userPassword);
    this.myRouter.navigateByUrl("/account/info");
  }

}
