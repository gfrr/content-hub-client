import { Routes } from '@angular/router';
import { SessionService } from './services/session.service';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: "signup", component: SignupComponent},
    { path: "dashboard", component: DashboardComponent, canActivate: [SessionService]},
    { path: "login", component: LoginComponent},
    { path: "user/:id", component: UserComponent}
];
