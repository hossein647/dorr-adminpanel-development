import { Component, Input, OnChanges, OnInit, SimpleChanges, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showSidebar: boolean;

  constructor(
    private layoutService: LayoutService,
  ) {
    effect(() => {
      this.showSidebar = this.layoutService.showSidebar();
    })
  }


  ngOnInit(): void {}

}
