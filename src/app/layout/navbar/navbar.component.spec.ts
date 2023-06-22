import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { LayoutService, MockLayoutService } from '../layout.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let layoutService = new LayoutService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: LayoutService, useClass: MockLayoutService }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    const { debugElement } = fixture;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the setting and showSidebar properties', () => {
    expect(component.setting).toBeDefined();
    expect(component.showSidebar).toBeDefined();
  })
});