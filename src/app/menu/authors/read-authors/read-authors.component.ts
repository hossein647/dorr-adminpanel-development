import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';
import { MyTableComponent } from 'src/app/shared/components/my-table/my-table.component';
import { CustomAuthor } from 'src/app/shared/interfaces';
import { Column } from 'src/app/shared/interfaces/models/column.interface';
import { AuthorService } from 'src/app/shared/services/author.service';

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
  authors: CustomAuthor[] = [];
  cols: Column[];


  constructor(
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'index', header: 'ردیف' },
      { field: 'name', header: 'نام نویسنده' },
      { field: 'profession', header: 'تخصص' }
    ];

    this.getAuthors()
  }


  async getAuthors() {
    const request = this.authorService.getAll('author/getAll', false)
    const response: any = await (firstValueFrom(request))
    
    this.authors = response.data
  }
}
