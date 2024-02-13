import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar'
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Setting } from 'src/app/shared/interfaces/setting.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AvatarModule, BadgeModule, OverlayPanelModule, ToastComponent],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  setting: Setting[];
  showSidebar: boolean;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.showSidebar = this.dashboardService.showSidebar();
    this.setting = [
      { label: 'اعلان',    icon: 'pi pi-bell',      method: null },
      { label: 'پروفایل', icon: 'pi pi-user',      method: () => this.profile() },
      { label: 'خروج',    icon: 'pi pi-power-off', method: () => this.logout() },
    ]
  }


  toggleSidebar() {
    this.dashboardService.showSidebar.set(!this.showSidebar);
    this.showSidebar = this.dashboardService.showSidebar()
  }



  profile() {
    
  }



  logout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        if (res.statusCode === 204) {
          this.messageService.add({ severity: 'success', summary: res.message });
          setTimeout(() => {
            this.authService.isLoggedIn.update(status => status = false);
            this.authService.setStatusLogin(false);
            this.router.navigate(['auth/login'])
          }, 1000);
        }
      },
      error: (err) => {        
      }
    })
  }
}
