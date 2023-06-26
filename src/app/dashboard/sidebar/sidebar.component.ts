import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showSidebar: boolean;
  menuItem: MenuItem[];
  selected: string = '';

  constructor(
    private dashboard: DashboardService,
    private rotuer: Router,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.menuItem = this.renderMenuItem();
    this.getSelectedMenu();
  }


  renderMenuItem(): MenuItem[] {
    return [
      { label: 'پست جدید', icon: PrimeIcons.PLUS, routerLink: 'new-post'}
    ]
  }


  goToPage(item: MenuItem) {    
    this.rotuer.navigate([item.routerLink], { relativeTo: this.activatedRoute });
    this.selected = item.routerLink;
  }


  getSelectedMenu() {
    this.selected = this.rotuer.url.slice(11);    
  }
}
