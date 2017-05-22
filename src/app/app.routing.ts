import { Routes } from '@angular/router';
import { SessionService } from './session.service';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: "main", component: MainComponent},
    { path: "signup", component: SignupComponent},
    { path: "login", component: LoginComponent},
    { path: "user/:id", component: UserComponent}
];
