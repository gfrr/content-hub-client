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
    // Ng2TweetModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
