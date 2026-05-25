import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <form [formGroup]="userForm" style="display: flex; flex-direction: column; gap: 12px; padding-top: 8px;">
        <mat-form-field appearance="outline">
          <mat-label>Full Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Role</mat-label>
          <mat-select formControlName="role">
            <mat-option value="Admin">Admin</mat-option>
            <mat-option value="General User">General User</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="userForm.invalid" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `
})
export class UserDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  userForm = this.fb.group({
    name: [this.data.user?.name || '', Validators.required],
    email: [this.data.user?.email || '', [Validators.required, Validators.email]],
    password: [this.data.user?.password || '', Validators.required],
    role: [this.data.user?.role || 'General User', Validators.required]
  });

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
