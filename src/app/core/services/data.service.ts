import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../models/record.model';
import { UserFull } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private readonly delay = 2000;

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(`/api/records?delay=${this.delay}`);
  }

  // Admin User Management
  getUsers(): Observable<UserFull[]> {
    return this.http.get<UserFull[]>(`/api/users?delay=${this.delay}`);
  }

  createUser(user: UserFull): Observable<UserFull> {
    return this.http.post<UserFull>('/api/users', user);
  }

  updateUser(id: string, user: UserFull): Observable<UserFull> {
    return this.http.put<UserFull>(`/api/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}
