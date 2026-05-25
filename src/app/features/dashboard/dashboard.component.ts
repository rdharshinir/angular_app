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
    }
    table {
      width: 100%;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  authService = inject(AuthService);

  records: Record[] = [];
  displayedColumns: string[] = ['id', 'name', 'accessLevel'];

  ngOnInit() {
    this.dataService.getRecords().subscribe(records => {
      this.records = records;
    });
  }
}
