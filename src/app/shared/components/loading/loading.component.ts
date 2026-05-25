import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="loading-container" *ngIf="loadingService.isLoading()">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
  `,
  styles: [`
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
    }
  `]
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
