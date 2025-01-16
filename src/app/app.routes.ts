import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Головна сторінка
  { path: 'users', component: UserListComponent },
];
