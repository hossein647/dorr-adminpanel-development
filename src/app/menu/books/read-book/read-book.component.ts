import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-read-book',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterLink],
  templateUrl: './read-book.component.html',
  styleUrl: './read-book.component.scss'
})
export class ReadBookComponent {

}
