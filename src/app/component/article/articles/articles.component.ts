import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableWithPaginatorComponent } from 'src/app/shared/component/table-with-paginator/table-with-paginator.component';
import { ButtonComponent } from 'src/app/shared/component/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { MessageService } from 'primeng/api';
import { Publication, PublicationLabel } from 'src/app/shared/interfaces/publication.interface';
import { Column } from 'src/app/shared/interfaces/columns';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, TableWithPaginatorComponent, ButtonComponent],
  providers: [MessageService],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  
  
  value: any[];
  cols: Column[];
  limit: number = 8;
  page: number = 1;
  totalDocs: number;
  totalPages: number;
  catrgory: { name: string, field: string};


  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.cols = this.initCols();
    this.getArticles(this.limit, this.page);
  }


  getArticles(limit: number, page: number) {
    this.articleService.getAllPaginate(limit, page).subscribe({
      next: (res: any) => {        
        if (res.data) {
          this.value = res.data.articles.docs;
          this.convertStatusToPersianLabel(this.value);
          
          this.totalDocs = res.data.articles.totalDocs;
          this.totalPages = res.data.articles.totalPages;
        } else {
          this.value = [];
          this.messageService.add({ severity: 'warn', summary: res.message })
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    })
  }



  initCols(): Column[] {
    return [
      { field: 'num', header: '#' },
      { field: 'title', header: 'عنوان' },
      { field: 'category', subField: 'name', header: 'دسته بندی' },
      { field: 'status', header: 'وضعیت' },
      { field: 'remove', header: 'حذف' },
      { field: 'edit', header: 'ویرایش' },
    ]
  }



  onChangePage(event: any) {
    this.page = event.page
    this.limit = event.limit;
    this.totalPages = event.totalPages;
    this.getArticles(this.limit, this.page);
  }



  onRemoveArticle(id: string) {
    this.articleService.remove(id).subscribe({
      next: (res: any) => {
        const isLastItem = this.totalDocs % (this.limit + 1) === 0;
        this.page = isLastItem ? this.page - 1 : this.page;
        this.getArticles(this.limit, this.page);
        this.messageService.add({ severity: 'success', summary: res.message });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message });
      },
    })
  }



  async navigateToEditArticle(rowData: any) {
    const { _id: id, name } = rowData;
    const queryParams = { id, name };;
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute, state: rowData, queryParams })
  }



  navigateToNewArticle() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }


  convertStatusToPersianLabel(articles: Article[]) {
    articles.forEach(article => {      
      article.status = article.status === Publication.PUBLISH ? PublicationLabel.PUBLISH_LABEL 
                                                              : PublicationLabel.UNPUBLISH_LABEL
    })    
  }
}
