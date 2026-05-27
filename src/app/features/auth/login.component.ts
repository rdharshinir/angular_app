import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['General User']
  });

  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loginErrorMessage: string | null = null;
  signupErrorMessage: string | null = null;

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.loginErrorMessage = null;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loginErrorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        }
      });
    }
  }

  onSubmitSignup() {
    if (this.signupForm.valid) {
      this.signupErrorMessage = null;
      const loginPayload = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: 'General User'
      };
      this.authService.login(loginPayload).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.signupErrorMessage = err.error?.message || 'Signup failed.';
        }
      });
    }
  }
}
