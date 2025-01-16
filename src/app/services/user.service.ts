import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = '/assets/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<unknown[]> {
    return this.http.get<any[]>(this.url);
  }
}
