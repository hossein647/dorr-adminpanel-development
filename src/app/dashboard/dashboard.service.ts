import { Injectable, Signal, WritableSignal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  showSidebar = signal(true);

  constructor() { 
  }

}








export class MockLayoutService implements DashboardService {
  
  showSidebar: WritableSignal<boolean> = signal(true);
}