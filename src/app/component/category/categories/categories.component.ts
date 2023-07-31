import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/columns';
import { CategoryService } from '../category.service';
import { MessageService } from 'primeng/api';
import { ButtonComponent } from 'src/app/shared/component/button/button.component';
import { TableWithPaginatorComponent } from 'src/app/shared/component/table-with-paginator/table-with-paginator.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TableWithPaginatorComponent, ButtonComponent],
  providers: [MessageService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  value: any[]
  cols: Column[];
  limit: number = 8;
  page: number = 1;
  totalDocs: number;
  totalPages: number;


  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.getCategories(this.limit, this.page);
    this.cols = this.initCols();
  }



  async getCategories(limit: number, page: number) {    
    this.categoryService.getAllPaginate(limit, page).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.value = res.data.categories.docs;
          this.totalDocs = res.data.categories.totalDocs;
          this.totalPages = res.data.categories.totalPages;
        } else {
          this.value = [];
          this.messageService.add({ severity: 'warn', summary: res.message });
        }
      },
      error: (err)=> {
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    });
  }



  initCols(): Column[] {
    return [
      { field: 'num', header: '#' },
      { field: 'name', header: 'نام' },
      { field: 'articles', subField: 'length', header: 'تعداد' },
      { field: 'remove', header: 'حذف' },
      { field: 'edit', header: 'ویرایش' },
    ]
  }


  
  onChangePage(event: any) {
    this.page = event.page
    this.limit = event.limit;
    this.totalPages = event.totalPages;
    this.getCategories(this.limit, this.page);
  }



  async onRemoveCategory(id: string) {
    this.categoryService.remove(id).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          const isLastItem = this.totalDocs % (this.limit + 1) === 0;
          this.page = isLastItem ? this.page -1 : this.page;
          this.getCategories(this.limit, this.page);
          this.messageService.add({ severity: 'success', summary: res.message })
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    })
  }

  

  navigateToNewRoute() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }



  navigateToEditRoute(rowData: any) {
    const { _id: id, name } = rowData;
    const queryParams = { id, name };;
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute, queryParams  })    
  }
}
