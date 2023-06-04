import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, MainContentComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showSidebar = true;
  constructor(
    private layoutService: LayoutService,
  ) {
    effect(() => {
      this.showSidebar = this.layoutService.showSidebar();
    })
  }

  ngOnInit() {}
}
