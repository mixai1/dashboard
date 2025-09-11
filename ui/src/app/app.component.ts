import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardModule } from './features/dashboard/dashboard.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [DashboardModule, RouterOutlet]
})
export class AppComponent {}
