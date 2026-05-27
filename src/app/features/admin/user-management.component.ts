import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../core/services/data.service';
import { UserFull } from '../../core/models/user.model';
import { UserDialogComponent } from './user-dialog.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './user-management.component.html',
  styles: [`
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .admin-header h1 {
      color: #ffffff;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }
    ::ng-deep .premium-card {
      background: rgba(25, 25, 35, 0.65) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 16px !important;
      color: white !important;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
    }
    table {
      width: 100%;
      background: transparent !important;
    }
    ::ng-deep .premium-card .mat-mdc-table {
      background: transparent !important;
    }
    ::ng-deep .premium-card .mat-mdc-header-cell {
      color: rgba(255, 255, 255, 0.7) !important;
      border-bottom-color: rgba(255, 255, 255, 0.1) !important;
      font-weight: 500;
    }
    ::ng-deep .premium-card .mat-mdc-cell {
      color: #ffffff !important;
      border-bottom-color: rgba(255, 255, 255, 0.05) !important;
    }
    ::ng-deep .premium-card .mat-mdc-row:hover .mat-mdc-cell {
      background: rgba(255, 255, 255, 0.05);
      transition: background 0.2s ease;
    }
    .actions-cell {
      display: flex;
      gap: 8px;
    }
    .add-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
      transition: all 0.3s ease;
    }
    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(118, 75, 162, 0.6);
    }
  `]
})
export class UserManagementComponent implements OnInit {
  private dataService = inject(DataService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  users: UserFull[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { title: 'Add New User' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.createUser(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
        });
      }
    });
  }

  editUser(user: UserFull) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { title: 'Edit User', user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateUser(user.id, result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        });
      }
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(id).subscribe(() => {
        this.loadUsers();
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
      });
    }
  }
}
