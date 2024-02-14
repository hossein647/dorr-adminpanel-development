import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private dashboard: DashboardService,
    private rotuer: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.menuItems = this.renderMenuItems();
    const mainRoute = this.extractMainRoute(this.rotuer.url)
    
    this.checkExpandedMenu(mainRoute);
    
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
            routerLink: 'read-authors'
          },
          { 
            id: 'sub-item',
            label: 'کتاب ها', 
            iconClass: PrimeIcons.BOOK, 
            routerLink: 'read-books'
          },
          { 
            id: 'sub-item',
            label: 'دسته بندی ها', 
            iconClass: PrimeIcons.TH_LARGE, 
            routerLink: 'read-categories'
          },
          { 
            id: 'sub-item',
            label: 'کاربران', 
            iconClass: PrimeIcons.USERS, 
            routerLink: 'read-users'
          },

        ]
      },
    ]
  }


  goToPage(event: any, item: MenuItem) {
    event?.stopPropagation()    
    if (this.hasChildren(item)) item.expanded = !item.expanded;
    else {      
      this.rotuer.navigate([item.routerLink], { relativeTo: this.activatedRoute });
    }
  }


  hasChildren(item: MenuItem) {
    return 'expanded' in item;
  }



  checkExpandedMenu(routeUrl: string) {
    this.menuItems.forEach((item: MenuItem) => {
      if (item.items?.length) {
        const result = item.items.filter((item: MenuItem) => {
          return item.routerLink === routeUrl 
        });
        if (result[0]?.id) item.expanded = true;
      }
    })
  }


  extractMainRoute(childRoute: string) {
    const secondSlashIndex = childRoute.indexOf('/', childRoute.indexOf('/') + 1);
    const thirdSlashIndex = childRoute.indexOf('/', secondSlashIndex + 1);

    if (thirdSlashIndex !== -1) {
      return childRoute.substring(secondSlashIndex + 1, thirdSlashIndex);
    } else {
      return childRoute.substring(secondSlashIndex + 1);
    }
  }
}
