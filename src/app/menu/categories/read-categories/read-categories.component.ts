import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { CustomCategory } from 'src/app/shared/interfaces/models/category.interface';
import { Column } from 'src/app/shared/interfaces/models/column.interface';

@Component({
  selector: 'app-read-categories',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterLink, HorizontalMenuComponent, MyTableComponent],
  templateUrl: './read-categories.component.html',
  styleUrl: './read-categories.component.scss'
})

export class ReadCategoriesComponent implements OnInit {
  createLabel : string = 'ایجاد';
  editLabel   : string = 'ویرایش';
  createRouter: string = 'create';
  editRouter  : string = '';

  categories: CustomCategory[] = [];
  cols: Column[];


  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'نام' },
      { field: 'alias', header: 'مستعار' }
    ]
  }
    
}
