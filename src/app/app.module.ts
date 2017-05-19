import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';



export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: "main", component: MainComponent},
    { path: "user/:id", component: UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MainComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
