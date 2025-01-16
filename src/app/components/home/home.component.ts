import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import {MatCard, MatCardActions, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserListComponent,
    MatPaginator,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  totalUsers = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); // Завантажуємо користувачів при ініціалізації
  }

  loadUsers():void {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.totalUsers = data.length; // Кількість усіх користувачів
      this.users = data.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize); // Лише для поточної сторінки
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(); // Завантажуємо користувачів для нової сторінки
  }
}
