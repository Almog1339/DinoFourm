import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { AccountComponent } from './account/account.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SeeAllPostsComponent } from './see-all-posts/see-all-posts.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'seeAllPosts', component:SeeAllPostsComponent},
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: '/account/info', pathMatch: 'full' },
      { path: 'info', component: InfoComponent },
      { path: 'edit', component: EditComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

const dbConfig: DBConfig = {
  name: 'Dino',
  version: 1,
  objectStoresMeta: [
    {
      store: 'Posts',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'content', keypath: 'content', options: { unique: false } },
      ],
    },
    {
      store: 'Comments',
      storeConfig: { keyPath: 'commentid', autoIncrement: true },
      storeSchema: [
        {
          name: 'postId',
          keypath: 'postId',
          options:{unique:false}
        },
        {
          name: 'comment',
          keypath: 'comment',
          options: { unique: false },
        },
        
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    InfoComponent,
    EditComponent,
    AccountComponent,
    PostsComponent,
    SeeAllPostsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StorageServiceModule,
    HttpClientModule, 
    AngularEditorModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
