import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module';
import { AvatarModule } from 'primeng/avatar'
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Setting } from 'src/app/interfaces/setting.interface';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SharedModule, AvatarModule, BadgeModule, OverlayPanelModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  setting: Setting[];
  showSidebar: boolean;

  constructor(
    private layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.showSidebar = this.layoutService.showSidebar();
    this.setting = [
      { label: 'پروفایل', icon: 'pi pi-user' },
      { label: 'خروج', icon: 'pi pi-power-off' },
    ]
  }


  toggleSidebar() {
    this.layoutService.showSidebar.set(!this.showSidebar);
    this.showSidebar = this.layoutService.showSidebar()
  }

}
