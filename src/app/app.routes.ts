import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { UploadComponent } from './main/upload/upload.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent, title: "Filters" },
    {path: "upload", component: UploadComponent, title:"Upload"},
    {path: "**", component: HomeComponent}
];
