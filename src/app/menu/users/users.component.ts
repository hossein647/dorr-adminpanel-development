import { Component } from '@angular/core';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { CustomUser } from 'src/app/shared/interfaces';
import { Column } from 'src/app/shared/interfaces/models/column.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HorizontalMenuComponent, MyTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {
  createLabel: string = 'ایجاد';
  editLabel: string = 'ویرایش';
  createRouter: string = 'create';
  editRouter: string = '';

  users: CustomUser[];
  cols: Column[];

  ngOnInit() {
    this.cols = [
      { field: 'email', header: 'ایمیل' },
      { field: 'badHistory', header: 'سوء سابقه' }
    ]

    this.users = [
      {
        email: 'hossein320@gmail.com',
        badHistory: 7
      },
      {
        email: 'omid064@gmail.com',
        badHistory: 0
      }
    ]
  }
}
