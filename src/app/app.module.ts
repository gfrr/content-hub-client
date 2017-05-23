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
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ContentComponent,
    SafePipe,
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
