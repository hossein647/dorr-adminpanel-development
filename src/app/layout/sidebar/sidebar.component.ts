import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardService } from '../dashboard/dashboard.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuModule, PanelMenuModule],
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
  ) {
    this.getRoutefreshPage();
  }


  ngOnInit(): void {
    this.menuItems = this.renderMenuItems();
    this.getSelectedMenu();
  }


  renderMenuItems(): MenuItem[] {
    return [
      { 
        id: 'main-item',
        label: 'داشبورد', 
        iconClass: PrimeIcons.HOME, 
        routerLink: '/dashboard'
      },
      { 
        id: 'main-item',
        label: 'مدیریت', 
        iconClass: PrimeIcons.TH_LARGE, 
        expanded: false,
        items: [
          { 
            id: 'sub-item',
            label: 'نویسندگان', 
            iconClass: PrimeIcons.USER_EDIT, 
            routerLink: 'manage-authors'
          },
          { 
            id: 'sub-item',
            label: 'کتاب ها', 
            iconClass: PrimeIcons.BOOK, 
            routerLink: 'manage-books'
          },
          { 
            id: 'sub-item',
            label: 'دسته بندی ها', 
            iconClass: PrimeIcons.TH_LARGE, 
            routerLink: 'manage-categories'
          },
          { 
            id: 'sub-item',
            label: 'کاربران', 
            iconClass: PrimeIcons.USERS, 
            routerLink: 'manage-users'
          },

        ]
      },
    ]
  }


  goToPage(event: any, item: MenuItem) {
    event?.stopPropagation()
    console.log(this.selected, item.routerLink);
    
    if (this.hasChildren(item)) item.expanded = !item.expanded;
    else {      
      this.rotuer.navigate([item.routerLink], { relativeTo: this.activatedRoute });
      this.selected = item.routerLink;
    }
  }


  hasChildren(item: MenuItem) {
    return 'expanded' in item;
  }

  getSelectedMenu() {
    console.log(this.rotuer.url);
    if (this.rotuer.url === '/dashboard') this.selected = '/dashboard';
    else this.selected = this.rotuer.url.slice(11);
     
  }


  getRoutefreshPage() {
    this.rotuer.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event);
          
          this.getSelectedMenu();
        }
      }
    })
  }
}
