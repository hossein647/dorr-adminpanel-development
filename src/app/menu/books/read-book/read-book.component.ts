import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { Book, CustomBook } from 'src/app/shared/interfaces';
import { Column } from 'src/app/shared/interfaces/models/column.interface';

@Component({
  selector: 'app-read-book',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterLink, MyTableComponent],
  templateUrl: './read-book.component.html',
  styleUrl: './read-book.component.scss'
})

export class ReadBookComponent {
  books: CustomBook[];

  cols: Column[];

  ngOnInit() {
    this.cols = [
      { field: 'index', header: 'ردیف' },
      { field: 'name', header: 'نام کتاب' },
      { field: 'author', header: 'نویسنده' },
      { field: 'category', header: 'دسته بندی' },
      { field: 'publisher', header: 'انتشارات' }
    ]

    this.books = [
      {
        name: 'فارسی',
        author: 'سعدی',
        category: 'ادبیات',
        publisher: 'بیان'
      },
      {
        name: 'ریاضی',
        author: 'حوارزمی',
        category: 'ریاضیات',
        publisher: 'خودم'
      }
    ]
  }
}
