import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  private readonly url = '/assets/users.json';

  constructor(private http: HttpClient) {}

  loadUsers(): void {
    this.http.get<User[]>('/assets/users.json').subscribe((data) => {
      this.users = data;
      this.usersSubject$.next(this.users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: User): void {
    user.createdAt = new Date().toISOString();
    this.users.unshift(user);
    this.usersSubject$.next(this.users);
  }

  editUser(updatedUser: User): void {
    const index = this.users.findIndex((user) => user.email === updatedUser.email);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      this.usersSubject$.next(this.users);
    } else {
      console.error('User not found for update');
    }
  }

  deleteUser(email: string): void {
    this.users = this.users.filter((user) => user.email !== email);
    this.usersSubject$.next(this.users);
  }

}
