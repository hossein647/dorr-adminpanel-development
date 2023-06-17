import { Injectable, Signal, WritableSignal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  showSidebar = signal(true);

  constructor() { 
  }

}








export class MockLayoutService implements LayoutService {
  
  showSidebar: WritableSignal<boolean> = signal(true);
}