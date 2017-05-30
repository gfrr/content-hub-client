import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SessionService } from './services/session.service';
import { FileSelectDirective } from "ng2-file-upload";
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ContentComponent } from './content/content.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SafePipe } from './pipes/safe.pipe';
import { TwitterPipe } from './pipes/twitter.pipe';
import { TweetComponent } from './tweet/tweet.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { RedditComponent } from './reddit/reddit.component';
import { TumblrComponent } from './tumblr/tumblr.component';
import { EditComponent } from './auth/dashboard/edit/edit.component';
import { DeleteComponent } from './auth/dashboard/delete/delete.component';
import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MdSelectModule, MdRadioModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ContentComponent,
    NavBarComponent,
    SafePipe,
    TwitterPipe,
    TweetComponent,
    YoutubeComponent,
    RedditComponent,
    TumblrComponent,
    EditComponent,
    DeleteComponent,

    // Ng2TweetModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    TagInputModule
    // BrowserAnimationsModule,
    // MdSelectModule,
    // MdRadioModule
  ],
  providers: [ SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
