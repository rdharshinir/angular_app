import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';
import { Record } from '../../core/models/record.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styles: [`
    .dashboard-header {
      margin-bottom: 24px;
      color: #ffffff;
      text-shadow: 1px 1px 4px rgba(0,0,0,0.8);
    }
    ::ng-deep .custom-card {
      background-color: rgba(255, 255, 255, 0.9) !important;
      border-radius: 16px !important;
      box-shadow: 4px 4px 0px #323232 !important;
      border: 2px solid #323232 !important;
      font-family: "Comic Sans MS", "Chalkboard SE", "Marker Felt", "Gochi Hand", sans-serif;
    }
    ::ng-deep table {
      width: 100%;
      background: transparent !important;
    }
    ::ng-deep th {
      font-weight: bold !important;
      color: #323232 !important;
      font-size: 16px !important;
    }
    ::ng-deep td {
      color: #323232 !important;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  authService = inject(AuthService);

  records: Record[] = [];
  displayedColumns: string[] = ['id', 'name', 'accessLevel'];

  errorMessage: string | null = null;

  ngOnInit() {
    this.dataService.getRecords().subscribe({
      next: (records) => {
        this.records = records;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load records: ' + (err.message || JSON.stringify(err));
        console.error('Fetch error:', err);
      }
    });
  }
}
