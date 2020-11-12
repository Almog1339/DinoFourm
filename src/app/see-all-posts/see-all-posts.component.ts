import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';

@Component({
  selector: 'app-see-all-posts',
  templateUrl: './see-all-posts.component.html',
  styleUrls: ['./see-all-posts.component.sass'],
})
export class SeeAllPostsComponent implements OnInit {
  constructor(private router: Router, private IndexedDb: NgxIndexedDBService) {
    this.IndexedDb.count('Posts').subscribe((postsCount) => {
      this.totalPosts = postsCount;
    });
    this.IndexedDb.count('Comments').subscribe((commentsCnt)=>{
      this.totalComments = commentsCnt;
    });
    this.IndexedDb.getAll('Comments').subscribe((success)=>{

      for (let index = 0; index < this.totalComments; index++) {
        if(index%2==0){
          this.comments.push(success[index].comment);
        }else{
          
        }
      
      }
    });
    this.getAllPosts();
  }

  commentEditorForm: FormGroup;
  allPosts: Array<any> = [];
  comments: any[] = [];
  totalPosts;
  totalComments;
  comment = '';

  ngOnInit(): void {
    this.commentEditorForm = new FormGroup({
      commentEditor: new FormControl(),
    });
  }

  getAllPosts() {
    this.IndexedDb.getAll('Posts').subscribe((posts) => {
      posts.forEach((post) => {
        this.allPosts.push(post['content']);
      });
    });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  savePostData(event){
    this.comment = event;
  }

  submitComment(postId) {
    this.IndexedDb.add('Comments',{comment:this.comment,commentId:this.totalComments+1}).subscribe((done)=>{

    });

    this.IndexedDb.add('Comments',{postId:postId}).subscribe((done)=>{
      
    });

    this.router.navigate(['']);
  }

  commentEditorConfig: AngularEditorConfig = {
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
