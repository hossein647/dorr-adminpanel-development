import { TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

describe('LayoutService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('#showSidebar property should be created', () => {
    expect(service.showSidebar()).toBe(true);
  });
});
