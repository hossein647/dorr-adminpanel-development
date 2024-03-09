import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { Book, CustomBook } from 'src/app/shared/interfaces';
import { Column } from 'src/app/shared/interfaces/models/column.interface';

@Component({
  selector: 'app-read-book',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterLink, MyTableComponent, HorizontalMenuComponent],
  templateUrl: './read-book.component.html',
  styleUrl: './read-book.component.scss'
})

export class ReadBookComponent {
  createLabel: string = 'ایجاد';
  editLabel: string = 'ویرایش';
  createRouter: string = 'create';
  editRouter: string = '';

  books: CustomBook[] = [];
  cols: Column[];

  ngOnInit() {
    this.cols = [
      { field: 'index', header: 'ردیف' },
      { field: 'name', header: 'نام کتاب' },
      { field: 'author', header: 'نویسنده' },
      { field: 'category', header: 'دسته بندی' },
      { field: 'publisher', header: 'انتشارات' }
    ]
  }
}
