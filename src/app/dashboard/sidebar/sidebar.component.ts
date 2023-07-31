import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showSidebar: boolean;
  menuItems: MenuItem[];
  selected: string = '';

  constructor(
    private dashboard: DashboardService,
    private rotuer: Router,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.menuItems = this.renderMenuItems();
    this.getSelectedMenu();
  }


  renderMenuItems(): MenuItem[] {
    return [
        { label: 'مقالات', icon: PrimeIcons.BOOK, routerLink: 'articles'},
        { label: 'دسته بندی ها', icon: PrimeIcons.BOX, routerLink: 'categories'},
        // { label: 'تگ ها', icon: PrimeIcons.TAGS, routerLink: 'tags'}
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
