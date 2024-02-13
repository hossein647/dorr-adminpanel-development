import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ToastModule, InputTextModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() placeholder: string;
  @Input() title: string;
  @Input() form: string;
  @Input() errorMessage: string;
  @Input() labelSubmit: string;
  @Input() classList: string;
  @Input() invalidForm: boolean;


  @ViewChild('formRef') formRef: NgModel;
  @Output() onCreate = new EventEmitter<MouseEvent | KeyboardEvent>();
  @Output() onFormChannge = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }


  async create(event: MouseEvent | KeyboardEvent) {    
    this.onCreate.emit(event);
  }


  onModelChange(value: string) {
    this.onFormChannge.emit(value);
  }
}
