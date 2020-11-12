import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account.service';
import { UserPostService } from '../shared/services/user-post.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { sequence } from '@angular/animations';
import { NgxIndexedDBModule, DBConfig, NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
})
export class PostsComponent implements OnInit {
  postEditorForm: FormGroup;
  singlePost = '';
  totalPosts;
  
  constructor(private router: Router, private IndexedDb: NgxIndexedDBService) {
    this.IndexedDb.count('Posts').subscribe((success)=>{
      this.totalPosts = success;
      console.log(this.totalPosts);
    })
  }

  ngOnInit(): void {
    this.postEditorForm = new FormGroup({
      editor: new FormControl(),
    });
  }

  submit(post) {
    this.totalPosts+=1;
    this.IndexedDb.add('Posts',{content:post,id:this.totalPosts});
    
    this.IndexedDb.getAll('Posts').subscribe((post) => {
      this.totalPosts = post.length;
    });
    
    this.singlePost = post;
    this.singlePost = '';
    this.router.navigate(['seeAllPosts']);
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '50px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '50px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
}
