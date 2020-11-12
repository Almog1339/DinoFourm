import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  constructor() { }
  totalPostNumber:number = sessionStorage.length;
  allPosts:string[];

  getAllPosts():string[]{
    for (let index = 0; index < sessionStorage.length; index++) {
      // alert(this.totalPostNumber);
      // alert(sessionStorage.getItem(sessionStorage.key(index)))
      this.allPosts.push(sessionStorage.getItem(sessionStorage.key(index)));
      return this.allPosts;
    }
  }

  setOnePost(text:string){
    sessionStorage.setItem(String(this.totalPostNumber+1),text);
  }

}
