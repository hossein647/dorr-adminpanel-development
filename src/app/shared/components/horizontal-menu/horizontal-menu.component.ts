import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-horizontal-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './horizontal-menu.component.html',
  styleUrl: './horizontal-menu.component.scss'
})
export class HorizontalMenuComponent {

  createRouter = input.required<string>();
  editRouter   = input.required<string>();

  createLabel  = input.required<string>();
  editLabel    = input.required<string>();
}
