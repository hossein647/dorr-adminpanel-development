import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CreateBookComponent } from '../../books/create-book/create-book.component';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CreateBookComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

}
