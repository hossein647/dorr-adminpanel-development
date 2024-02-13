import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HorizontalMenuComponent } from 'src/app/shared/components/horizontal-menu/horizontal-menu.component';

@Component({
  selector: 'app-read-categories',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterLink, HorizontalMenuComponent],
  templateUrl: './read-categories.component.html',
  styleUrl: './read-categories.component.scss'
})
export class ReadCategoriesComponent {

}
