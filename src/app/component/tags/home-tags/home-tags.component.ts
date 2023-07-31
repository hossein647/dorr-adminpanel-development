import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-tags',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home-tags.component.html',
  styleUrls: ['./home-tags.component.scss']
})
export class HomeTagsComponent {

}
