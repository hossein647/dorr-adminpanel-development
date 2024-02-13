import { Component } from '@angular/core';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';

@Component({
  selector: 'app-read-authors',
  standalone: true,
  imports: [HorizontalMenuComponent],
  templateUrl: './read-authors.component.html',
  styleUrl: './read-authors.component.scss'
})
export class ReadAuthorsComponent {
  createLabel: string = 'ایجاد';
  editLabel: string = 'ویرایش';
  createRouter: string = 'create';
  editRouter: string = '';
}
