import { Injectable, Signal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  showSidebar = signal(true);

  constructor() { 
  }

}
