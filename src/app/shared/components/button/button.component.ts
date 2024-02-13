import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label: string;
  @Input() classList: string;
  @Input() disabled: boolean;
  @Output() clickListener = new EventEmitter<MouseEvent>();


  click($event: MouseEvent) {
    this.clickListener.emit($event);
  }
}
