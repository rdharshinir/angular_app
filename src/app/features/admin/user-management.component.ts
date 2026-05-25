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
    table {
      width: 100%;
    }
    .actions-cell {
      display: flex;
      gap: 8px;
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
