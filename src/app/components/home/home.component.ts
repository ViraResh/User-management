import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserListComponent,
    MatPaginator,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers();

    this.userService.getUsers().subscribe((data: User[]) => {
      this.totalUsers = data.length;
      this.users = data.slice(
        this.currentPage * this.pageSize,
        (this.currentPage + 1) * this.pageSize
      );
    });
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.totalUsers = data.length;
      this.users = data.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  handleAdd(newUser: User): void {
    this.userService.addUser(newUser);
    this.userService.getUsers().subscribe((data: User[]) => {
      this.totalUsers = data.length;
      this.users = data.slice(
        this.currentPage * this.pageSize,
        (this.currentPage + 1) * this.pageSize
      );
    });
  }

  handleEdit(updatedUser: User): void {
    this.userService.editUser(updatedUser);
    this.loadUsers();
  }

  handleDelete(updatedUser: User): void {
    this.userService.deleteUser(updatedUser.email);
    this.loadUsers();
  }
}
