import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Book, CustomBook } from 'src/app/shared/interfaces';
import { Column } from '../../interfaces/models/column.interface';


@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.scss'
})
export class MyTableComponent {
  // rows = input.required<CustomBook>();
  // cols = input.required<Column>();
  @Input() data : CustomBook[]
  @Input() cols : Column[]

  ngOnInit() {
    // this.cols([
    //   { field: 'name', header: 'نام کتاب' },
    //   { field: 'author', header: 'نویسنده' },
    //   { field: 'category', header: 'دسته بندی' },
    //   { field: 'publisher', header: 'انتشارات' }
    // ]) 

    // this.rows = [
    //   {[
    //   { field: 'name', header: 'نام کتاب' },
    //   { field: 'author', header: 'نویسنده' },
    //   { field: 'category', header: 'دسته بندی' },
    //   { field: 'publisher', header: 'انتشارات' }
    // ]
    //     name: 'فارسی',
    //     author: 'سعدی',
    //     category: 'ادبیات',
    //     publisher: 'بیان'
    //   },
    //   {
    //     name: 'ریاضی',
    //     author: 'حوارزمی',
    //     category: 'ریاضیات',
    //     publisher: 'خودم'
    //   }
    // ]
  }
}
