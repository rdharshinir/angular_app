import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signals for reactive state
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.role === 'Admin');

  login(credentials: any) {
    return this.http.post<User>('/api/login', credentials).pipe(
      tap(user => {
        this.currentUserSignal.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  private getUserFromStorage(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }
}
