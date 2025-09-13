import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { provideHttpClient } from '@angular/common/http';
import { API_HOST_URL } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NgxsModule.forRoot([]), DashboardModule],
      providers: [provideHttpClient(), { provide: API_HOST_URL, useValue: 'test' }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
