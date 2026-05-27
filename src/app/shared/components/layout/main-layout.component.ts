import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="page-container">
      <app-navbar></app-navbar>
      <main class="dashboard-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-image: url('/image.png');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
    }
    .page-container::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
      z-index: 1;
    }
    app-navbar {
      position: relative;
      z-index: 2;
    }
    .dashboard-content {
      position: relative;
      z-index: 2;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class MainLayoutComponent {}
