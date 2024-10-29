import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { UploadComponent } from './main/upload/upload.component';
import { LoginComponent } from './main/login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { authGuardGuard } from './services/auth-guard.guard';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "home", component: HomeComponent, title: "Filters", canActivate: [authGuardGuard] },
    {path: "upload", component: UploadComponent, title: "Upload", canActivate: [authGuardGuard]},
    {path: "signup", component: SignupComponent, title: "Sign up"},
    {path: "login", component: LoginComponent, title: "Logga in"},
    {path: "**", redirectTo: ""}
];
