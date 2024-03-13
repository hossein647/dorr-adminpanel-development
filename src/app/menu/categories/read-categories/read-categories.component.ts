import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { firstValueFrom } from 'rxjs';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { Category, CustomCategory } from 'src/app/shared/interfaces/models/category.interface';
import { Column } from 'src/app/shared/interfaces/models/column.interface';
import { CategoryService } from 'src/app/shared/services/category.service';

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

  constructor(
    private categoriesService: CategoryService<Category>
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'نام' },
      { field: 'alias', header: 'مستعار' }
    ];

    this.getCategories();
  }
  

  async getCategories() {
    const request = this.categoriesService.getAll('category/getAll', false)
    const response: any = await (firstValueFrom(request))

    console.log(request);

    this.categories = response.data
  }
}
