import { Component } from '@angular/core';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { CustomAuthor } from 'src/app/shared/interfaces';
import { Column } from 'src/app/shared/interfaces/models/column.interface';

@Component({
  selector: 'app-read-authors',
  standalone: true,
  imports: [HorizontalMenuComponent, MyTableComponent],
  templateUrl: './read-authors.component.html',
  styleUrl: './read-authors.component.scss'
})
export class ReadAuthorsComponent {
  createLabel: string = 'ایجاد';
  editLabel: string = 'ویرایش';
  createRouter: string = 'create';
  editRouter: string = '';

  authors: CustomAuthor[];

  cols: Column[];

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'نام نویسنده' },
      { field: 'birthDate', header: 'تاریخ تولد' },
      { field: 'profession', header: 'تخصص' }
    ]

    this.authors = [
      {
        name: 'حسین',
        birthDate: '1935',
        profession: "Author"
      },
      {
        name: 'حسین',
        birthDate: '1935',
        profession: "Author"
      }
    ]
  }
}
